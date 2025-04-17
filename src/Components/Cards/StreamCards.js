import { useEffect, useState } from "react";
import axios from "axios";                                   // <-- NEW
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { baseURL } from "../../utils/StaticVariables";
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

  /* ---------------- WebSocket controls ---------------- */

  const startVideo = () => {
    const token = authRecoil.token;
    const streamUrl = `wss://16.170.216.227/stream?stream_id=${data.id}&token=${token}`;
    const socket = new WebSocket(streamUrl);

    socket.onopen = () => console.log("WebSocket Connected");

    socket.onmessage = (event) => {
      try {
        const messageObj = JSON.parse(event.data);
        setMessages(messageObj);
      } catch (err) {
        console.log("Error parsing JSON:", err);
      }
    };

    socket.onerror = (err) => console.error("WebSocket Error:", err);
    socket.onclose  = () => console.log("WebSocket Disconnected");

    setWs(socket);
    setIsVideoPlaying(true);
  };

  const stopStreamOnServer = () =>
    axios.post(baseURL + `stop_stream/${data.id}`,
      {},
      { headers: { Authorization: `Bearer ${authRecoil.token}` } }
    );

  const stopVideo = async () => {
    if (ws) ws.close();
    setIsVideoPlaying(false);
    try {
      await stopStreamOnServer();                       // <-- NEW
    } catch (err) {
      console.error("Failed to stop stream:", err);
    }
  };

  /* ---------------- cleanup on unmount ---------------- */
  useEffect(() => {
    return () => {
      if (ws) ws.close();
      // notify backend if stream was playing
      if (isVideoPlaying) {
        stopStreamOnServer().catch((err) =>
          console.error("Failed to stop stream:", err)
        );
      }
    };
  }, [ws, isVideoPlaying, data.id, authRecoil.token]);

  /* ---------------- dialog handlers ---------------- */
  const openFullScreen = () => setOpenPopup(true);
  const closeFullScreen = () => setOpenPopup(false);

  /* ---------------- render ---------------- */
  return (
    <div>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={
            messages?.frame
              ? BASE64_IMAGE_PREFIX + messages.frame
              : "/path/to/dump-image.jpg"
          }
          alt="Video Stream"
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            Live video feed from <b>{data.name}</b> Camera
          </Typography>

          <DesBtn text="open full screen" noBoarder handle={openFullScreen} disabled={!messages}>
            <FullscreenIcon />
          </DesBtn>

          {!isVideoPlaying ? (
            <DesBtn text="start stream" noBoarder handle={startVideo}>
              <PlayCircleFilledIcon />
            </DesBtn>
          ) : (
            <DesBtn text="stop stream" noBoarder handle={stopVideo}>
              <PauseCircleIcon />
            </DesBtn>
          )}
        </CardContent>
      </Card>

      {/* full‑screen dialog */}
      <Dialog open={openPopup} onClose={closeFullScreen} fullWidth maxWidth="md">
        <DialogTitle>Full Screen {data.name} Video</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              height="400"
              image={
                messages?.frame
                  ? BASE64_IMAGE_PREFIX + messages.frame
                  : "/path/to/dump-image.jpg"
              }
              alt="Video Stream"
              sx={{ objectFit: "cover" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullScreen}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default WebSocketComponent;
