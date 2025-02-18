// Constants
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const STREAM_TIMEOUT = 10000;
const STARTING_MESSAGE = 'Starting detection...';
const RUNNING_MESSAGE = 'Detection running';
const STOPPING_MESSAGE = 'Stopping detection...';
const STOPPED_MESSAGE = 'Detection stopped';
const LOADING_MESSAGE = 'Loading stream...';

// Global state
let isStreaming = false;
let isStopping = false;
let streamSources = [];
let streamRetryCounts = {};
let streamCount = 1;
let streamElements = [];
let activeStreamIds = [];
let abortControllers = {};
let timeoutIds = {};
let isLoading = {};


// DOM Elements
let videoGrid;
let startButton;
let stopButton;
let inputContainer;
let addInputButton;
let loadingIndicator;
let statusMessage;
let errorMessage;
let frameDelayInput;
let frameSkipInput;
let confThresholdInput;

class ConfirmDialog {
    constructor() {
        this.createDialog();
    }

    createDialog() {
        const dialog = document.createElement('div');
        dialog.id = 'confirm-dialog';
        dialog.style.display = 'none';
        // Position it below the stop button instead of full screen
        dialog.className = 'bg-gray-800 rounded-lg shadow-lg mt-2 p-4 absolute right-0';

        dialog.innerHTML = `
            <div class="mb-2">
                <h2 class="text-lg font-semibold text-white">Confirm Stop Detection</h2>
                <p class="text-gray-300 text-sm mt-1">Are you sure you want to proceed?</p>
            </div>
            <div class="flex justify-end space-x-2">
                <button id="cancel-stop" class="px-3 py-1 rounded bg-gray-700 text-white hover:bg-gray-600 text-sm">
                    Cancel
                </button>
                <button id="confirm-stop" class="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600 text-sm">
                    Stop
                </button>
            </div>
        `;

        // Insert dialog after the controls-btn div
        const controlsBtn = document.querySelector('.controls-btn');
        controlsBtn.style.position = 'relative'; // Make it a positioning context
        controlsBtn.appendChild(dialog);

        // Close dialog when clicking outside
        document.addEventListener('click', (e) => {
            if (this.dialog.style.display === 'block' &&
                !this.dialog.contains(e.target) &&
                !e.target.matches('#stop-button')) {
                this.hide();
            }
        });

        document.getElementById('cancel-stop').addEventListener('click', () => {
            this.hide();
        });

        this.dialog = dialog;
    }

    show(onConfirm) {
        this.dialog.style.display = 'block';
        document.getElementById('confirm-stop').onclick = () => {
            onConfirm();
            this.hide();
        };
    }

    hide() {
        this.dialog.style.display = 'none';
    }
}


// Check if we're on the streaming page
function isStreamingPage() {
    return document.getElementById('video-grid') !== null;
}

// Initialize UI state
function initializeUI() {
    if (!isStreamingPage()) {
        return; // Exit if not on streaming page
    }
    updateStatusMessage('Ready to start detection');
    addInput();
}

function createInputFields(index) {
    try {
        const inputDiv = document.createElement('div');
        inputDiv.classList.add('input-row');
        inputDiv.innerHTML = `
            <label for="input-${index}">Input ${index + 1}:</label>
            <input type="text" id="camera-id-${index}" placeholder="Enter camera ID" style="width: 20%;">
            <select id="input-type-${index}">
                <option value="video">Video File</option>
                <option value="rtsp">RTSP Stream</option>
                <option value="webcam">Webcam</option>
            </select>
            <input type="text" id="input-${index}" placeholder="Enter video file path or RTSP URL">
            <button type="button" class="remove-input-button button">Remove</button>
        `;
        inputDiv.querySelector(".remove-input-button").addEventListener('click', () => {
            inputDiv.remove();
            updateStreamGrid();
        });
        return inputDiv;
    } catch (error) {
        console.error("Error in createInputFields", error);
        return null;
    }
}

function addInput() {
    try {
        const index = inputContainer.children.length;
        const inputFields = createInputFields(index);
        inputContainer.appendChild(inputFields);
        updateStreamGrid();
    } catch (error) {
        console.error("Error in addInput:", error);
    }
}

function updateStatusMessage(message, isError = false) {
    if (!isStreamingPage()) {
        return;
    }

    try {
        if (isError && errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
            if (statusMessage) {
                statusMessage.style.display = 'none';
            }
        } else if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.style.display = 'block';
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
            statusMessage.style.color = '#fff';
        }
    } catch (error) {
        console.warn('Status message elements not found:', error);
    }
}

function toggleLoading(show) {
    if (loadingIndicator) {
        loadingIndicator.classList.toggle('hidden', !show);
        loadingIndicator.setAttribute('aria-busy', show);
    }
}

function generateStreamId() {
    return 'stream-' + Math.random().toString(36).substring(2, 15);
}

function updateStreamGrid() {
    videoGrid.innerHTML = '';
    streamElements = [];
    streamSources = [];
    streamRetryCounts = {};
    abortControllers = {};
    timeoutIds = {};
    isLoading = {};

    streamCount = inputContainer.children.length || 1;

    // Clear activeStreamIds - they will be set by the backend response
    activeStreamIds = [];

    for (let i = 0; i < streamCount; i++) {
        const videoElement = document.createElement('img');
        videoElement.id = `video-stream-${i}`; // Use index-based ID
        videoElement.alt = `Video Stream`;
        videoElement.classList.add('video-stream');
        videoElement.style.display = 'none';
        videoGrid.appendChild(videoElement);
        streamElements.push(videoElement);
    }
    videoGrid.appendChild(loadingIndicator);
}

function collectInputs() {
    const inputs = [];
    for (let i = 0; i < inputContainer.children.length; i++) {
        const inputType = document.getElementById(`input-type-${i}`).value;
        const inputElement = document.getElementById(`input-${i}`);
        const cameraIdElement = document.getElementById(`camera-id-${i}`);
        if (inputElement.value) {
            let inputValue = inputElement.value;
            if (inputType === 'webcam') {
                inputValue = 0;
            }
            inputs.push({
                camera_id: cameraIdElement.value || `camera_${i}`,
                source: inputValue
            });
        }
    }
    return inputs;
}

async function startSingleStream(streamIndex, streamUrl, cameraId) {
    if (isStopping) return;
    const streamId = activeStreamIds[streamIndex];
    console.log(`Attempting to start stream at index: ${streamIndex}, streamId: ${streamId}, URL: ${streamUrl}`);
    const videoStreamElement = streamElements[streamIndex];
   
  
      try {
      if (isStopping) return;
       toggleLoading(true);
           isLoading[streamId] = true;
        videoStreamElement.src = streamUrl;
        await new Promise((resolve, reject) => {
         if (isStopping) {
              isLoading[streamId] = false;
            return reject(new Error(`Stop request pending, aborting starting single stream ${streamId}.`));
         }
           videoStreamElement.onload = () => {
               if(!isLoading[streamId]){
                   return reject(new Error(`Loading was already canceled for  ${streamId}`));
                }
              console.log(`Video stream started at index ${streamIndex}, id: ${streamId}`);
                isLoading[streamId] = false;
                resolve();
           };
         videoStreamElement.onerror = (error) => {
             if (!isLoading[streamId]) {
                 return reject(new Error(`Loading was already canceled for  ${streamId}`));
                }
           console.error(`Error loading video stream at index ${streamIndex}, id: ${streamId}: ${error}`);
              isLoading[streamId] = false;
                reject(new Error(`Video loading error for stream at index: ${streamIndex}, id: ${streamId}.`));
          };
        timeoutIds[streamId] = setTimeout(() => {
              console.error(`Timeout for stream at index: ${streamIndex}, id: ${streamId}`);
                 if(isLoading[streamId]){
                  isLoading[streamId] = false;
                     reject(new Error(`Stream start timeout for stream at index: ${streamIndex}, id: ${streamId}.`));
                  }

          }, STREAM_TIMEOUT);

     });
         if(isStopping) return;
          videoStreamElement.style.display = 'block';
        streamRetryCounts[streamId] = 0;
    } catch (error) {
      handleStreamError(error, streamIndex);
    } finally {
      toggleLoading(false);
        if (timeoutIds[streamId]) {
         clearTimeout(timeoutIds[streamId]);
          timeoutIds[streamId] = null;
      }

    }
}

async function startStream() {
    if (isStreaming) return;
    try {
        const inputs = collectInputs();
        if (inputs.length === 0) {
            updateStatusMessage("Please add an input source", true);
            return;
        }

        updateStatusMessage(STARTING_MESSAGE);
        isStreaming = true;
        isStopping = false;
        updateButtonStates();

        const frameDelay = parseFloat(frameDelayInput.value);
        const frameSkip = parseInt(frameSkipInput.value, 10);
        const confThreshold = parseFloat(confThresholdInput.value);
        // Clear previous streams
        activeStreamIds = [];
        streamElements.forEach(el => el.src = '');
        
        const response = await fetch(`/video_stream?frame_delay=${frameDelay}&frame_skip=${frameSkip}&conf=${confThreshold}`, {
            method: 'POST',
            signal: abortControllers["all"]?.signal,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputs: inputs }),
        });

        if (!response.ok) {
            const message = await response.text();
            throw new Error(`Failed to start streams: ${message}`);
        }

        const data = await response.json();
        // Extract stream IDs from URLs (e.g., "/video_stream/stream-id" -> "stream-id")
        streamSources = data.stream_urls.map(url => url.split('/').pop());
        activeStreamIds = streamSources; // Use backend-generated IDs

        // Initialize state for each stream
        streamSources.forEach(streamId => {
            streamRetryCounts[streamId] = 0;
            isLoading[streamId] = false;
            abortControllers[streamId] = new AbortController();
            timeoutIds[streamId] = null;
        });

        // Start each stream using the backend's stream ID
        for (let i = 0; i < activeStreamIds.length; i++) {
            const streamId = activeStreamIds[i];
            const streamUrl = `/video_stream/${streamId}`; // Full URL
            await startSingleStream(i, streamUrl, inputs[i].camera_id);
        }

        if (!isStopping) {
            updateStatusMessage(RUNNING_MESSAGE);
        }
    } catch (error) {
        handleStreamError(error);
    }
}

async function stopSingleStream(streamIndex) {
    const streamId = activeStreamIds[streamIndex];
     const videoStreamElement = streamElements[streamIndex];
    
  try {
      if (timeoutIds[streamId]) {
        clearTimeout(timeoutIds[streamId]);
          timeoutIds[streamId] = null;
       }
      
         if (abortControllers[streamId]) {
            abortControllers[streamId].abort();
          }
         if(isLoading[streamId]){
             isLoading[streamId]=false;
            videoStreamElement.onload=null;
            videoStreamElement.onerror = null;
         }


          const stopResponse = await fetch(`/stop_stream/${streamId}`, {
                method: 'POST',
                signal: abortControllers[streamId]?.signal // Abort single stream fetch
        });
       if (!stopResponse.ok) {
              throw new Error(`Failed to stop stream on server for stream ${streamId}`);
        }

      videoStreamElement.src = '';
         videoStreamElement.style.display = 'none';
      streamRetryCounts[streamId] = 0;

  } catch (error) {
    console.error(`Error stopping stream ${streamId}:`, error);
      updateStatusMessage(`Error stopping detection for stream ${streamId}. Please try again.`, true);
   }
}
async function stopStream() {
    if (!isStreaming) return;
  try {
      toggleLoading(true);
      updateStatusMessage(STOPPING_MESSAGE);
          isStopping = true;
            //  Abort fetch on start
       if (abortControllers["all"]) {
          abortControllers["all"].abort();
           abortControllers["all"] = null;
         }
      abortControllers["all"] = new AbortController();

    await Promise.all(streamElements.map((_, index) => stopSingleStream(index)));
          isStreaming = false;
        updateStatusMessage(STOPPED_MESSAGE);
      updateButtonStates();


   } catch (error) {
     console.error('Error stopping all streams:', error);
     updateStatusMessage('Error stopping detection. Please try again.', true);
   } finally {
      toggleLoading(false);
       isStopping= false;
    }
}
function updateButtonStates() {
    startButton.disabled = isStreaming;
  stopButton.disabled = !isStreaming;
  addInputButton.disabled = isStreaming;
}

function handleStreamError(error, streamIndex) {
    if(isStopping) return;
      const streamId = activeStreamIds[streamIndex];
    console.error(`Stream error for ${streamId}:`, error);
 if(streamRetryCounts[streamId] < MAX_RETRIES && isStreaming){
     streamRetryCounts[streamId]++;
         updateStatusMessage(`Retry attempt ${streamRetryCounts[streamId]}/${MAX_RETRIES} for stream ${streamId}...`);
         setTimeout(() => startSingleStream(streamIndex, streamSources[streamIndex],streamId), RETRY_DELAY);

   }  else if (isStreaming) {
      stopSingleStream(streamIndex);
        updateStatusMessage(
               error.message === 'Stream start timeout'
             ? `Failed to start stream ${streamId}: Connection timeout. Please try again.`
            :`Failed to start stream ${streamId}. Please try again.`,
              true
      );
    }
}


function setupVideoErrorHandlers() {
    streamElements.forEach((videoElement, index) => {
     videoElement.addEventListener('error', (event) => {
                if (isStreaming) {
                     handleStreamError(new Error(`Video stream error for ${activeStreamIds[index]}`), index);
                }
          });
       });
}
function initializeDOMElements() {
     if (!isStreamingPage()) {
        return false;
    }

    try {
        videoGrid = document.getElementById('video-grid');
       startButton = document.getElementById('start-button');
         stopButton = document.getElementById('stop-button');
          inputContainer = document.getElementById('input-container');
           addInputButton = document.getElementById('add-input-button');
           loadingIndicator = document.getElementById('loading-indicator');
           statusMessage = document.getElementById('status-message');
        errorMessage = document.getElementById('error-message');
        frameDelayInput = document.getElementById('frame-delay');
       frameSkipInput = document.getElementById('frame-skip');
          confThresholdInput = document.getElementById('conf-threshold');


    if (!videoGrid || !inputContainer) {
           console.warn('Critical streaming elements not found');
             return false;
       }
       return true;

    } catch (error) {
          console.warn('Error initializing DOM elements:', error);
      return false;
   }
}



// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
   if (initializeDOMElements()) {
        // Initialize confirmation dialog
        const confirmDialog = new ConfirmDialog();

          initializeUI();
       setupVideoErrorHandlers();


      if (addInputButton) {
        addInputButton.addEventListener('click', addInput);
     }
      if (startButton) {
      startButton.addEventListener('click', startStream);
       }

      if (stopButton) {
            stopButton.addEventListener('click', (e) => {
                e.preventDefault();
             confirmDialog.show(stopStream);
         });
       }
    }
});


// Handle visibility change
document.addEventListener('visibilitychange', async () => {
    if (document.hidden && isStreaming) {
      await stopStream();
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', async () => {
    if (isStreaming) {
     await stopStream();
      }
});