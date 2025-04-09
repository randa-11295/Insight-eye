import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";
import DesBtn from "../Reusable/DesBtn";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
const WebSocketComponent = ({ data }) => {
  const [messages, setMessages] = useState(null);
  const [ws, setWs] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [authRecoil] = useRecoilState(authState);
  const [openPopup, setOpenPopup] = useState(false);

  // Open WebSocket connection
  const startVideo = () => {
    const token = localStorage.token;
    const streamUrl = `ws://16.170.216.227/stream?stream_id=${data.id}&token=${token}`;
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
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={
            messages?.frame
              ? BASE64_IMAGE_PREFIX + messages?.frame
              : "/path/to/dump-image.jpg"
          }
          alt="Video Stream"
          sx={{ objectFit: "cover" }}
        />
     
        <CardContent sx={{display : "flex" , justifyContent : "space-between", alignItems:"center"}}>
          <Typography variant="body2" color="text.secondary" sx={{flexGrow : 1}}>
            Live video feed from <b>{data.name}</b> Camera
          </Typography>
          <DesBtn
            text="open full screen"
            noBoarder={true}
            handle={openFullScreen}
            disabled={!messages}
          >
            <FullscreenIcon />
          </DesBtn>
          {!isVideoPlaying ? (
            <DesBtn text="start stream" noBoarder={true} handle={startVideo}>
              <PlayCircleFilledIcon />
            </DesBtn>
          ) : (
            <DesBtn text="stop stream" noBoarder={true} handle={stopVideo}>
              <PauseCircleIcon />
            </DesBtn>
          )}
        </CardContent>
      </Card>

      {/* Fullscreen Popup */}
      <Dialog
        open={openPopup}
        onClose={closeFullScreen}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Full Screen {data.name} Video</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              height="400"
              image={
                messages?.frame
                  ? BASE64_IMAGE_PREFIX + messages?.frame
                  : "/path/to/dump-image.jpg"
              }
              alt="Video Stream"
              sx={{ objectFit: "cover" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullScreen} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WebSocketComponent;
