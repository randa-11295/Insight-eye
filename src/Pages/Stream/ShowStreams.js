import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { Card, CardContent, CardMedia, Box, Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState(null);
  const [ws, setWs] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [authRecoil] = useRecoilState(authState);
  const [openPopup, setOpenPopup] = useState(false);

  // Open WebSocket connection
  const startVideo = () => {
    const token = localStorage.token;
    const streamid = "226d039d-87a4-495f-a8be-5f6b39a09fff";
    const streamUrl = `ws://16.170.216.227/stream?stream_id=${streamid}&token=${token}`;
    const socket = new WebSocket(streamUrl);

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
      try {
        const messageObj = JSON.parse(event.data);
        console.log("Parsed message:", messageObj);
        setMessages(messageObj);
      } catch (error) {
        console.log("Error parsing JSON:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    setWs(socket);
    setIsVideoPlaying(true);
  };

  // Stop WebSocket connection
  const stopVideo = () => {
    if (ws) {
      ws.close();
    }
    setIsVideoPlaying(false);
  };

  // Handle opening the popup
  const openFullScreen = () => {
    setOpenPopup(true);
  };

  // Handle closing the popup
  const closeFullScreen = () => {
    setOpenPopup(false);
  };

  // Cleanup WebSocket connection on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <div>
      <h2>WebSocket Video Stream</h2>

      {/* Video display */}
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={messages?.frame ? BASE64_IMAGE_PREFIX + messages?.frame : "/path/to/dump-image.jpg"}
          alt="Video Stream"
          sx={{ objectFit: "cover" }}
        />
        <CardContent>
          {!isVideoPlaying ? (
            <Button variant="contained" color="primary" onClick={startVideo}>Start Video</Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={stopVideo}>Stop Video</Button>
          )}
          <Button variant="outlined" color="primary" onClick={openFullScreen}>Open Fullscreen</Button>
        </CardContent>
      </Card>

      {/* Fullscreen Popup */}
      <Dialog open={openPopup} onClose={closeFullScreen} fullWidth maxWidth="md">
        <DialogTitle>Full Screen Video</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              height="400"
              image={messages?.frame ? BASE64_IMAGE_PREFIX + messages?.frame : "/path/to/dump-image.jpg"}
              alt="Video Stream"
              sx={{ objectFit: "cover" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullScreen} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WebSocketComponent;
