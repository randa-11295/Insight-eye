import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { baseURL, BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";
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
import DesBtn from "../Reusable/DesBtn";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import useFetchStreams from "../../hooks/useFetchStreams";
import noImage from "../../Images/no-image.jpeg";

const WebSocketComponent = ({ data }) => {
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);
  const [openPopup, setOpenPopup] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const { refetchStreams } = useFetchStreams();
  const [imgSrc, setImgSrc] = useState(noImage);

  useEffect(() => {
    if (data.static_base64) {
      setImgSrc(BASE64_IMAGE_PREFIX + data.static_base64);
    }
    if (data.is_streaming === true) {
      startStream();
    }
  }, [data]);

  const startStream = useCallback(() => {
    const token = authRecoil.token;
    const streamUrl = `wss://16.170.216.227/stream?stream_id=${data.id}&token=${token}`;
    const socket = new WebSocket(streamUrl);

    socket.onopen = () => {
      setStreaming(true);
    };

    socket.onmessage = (event) => {
      try {
        const messageObj = JSON.parse(event.data);
        if (messageObj?.frame) {
          setImgSrc(BASE64_IMAGE_PREFIX + messageObj.frame);
        } else {
          setImgSrc(noImage);
        }
      } catch (err) {
        console.error("Error parsing JSON:", err);
        setImgSrc(noImage);
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket Error:", err);
      setImgSrc(noImage);
    };

    socket.onclose = () => {
      console.log("WebSocket Disconnected");
      setStreaming(false);
    };

    setWs(socket);
  }, [authRecoil.token, data.id]);

  const stopStream = async () => {
    if (ws) ws.close();
    setWs(null);
    setStreaming(false);

    try {
      await axios.post(
        `${baseURL}stop_stream/${data.id}`,
        {},
        { headers: { Authorization: `Bearer ${authRecoil.token}` } }
      );
      refetchStreams();
    } catch (err) {
      console.error("Failed to stop stream:", err);
    }
  };

  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
        setWs(null);
      }
    };
  }, [ws]);

  const openFullScreen = () => setOpenPopup(true);
  const closeFullScreen = () => setOpenPopup(false);

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <CardMedia
          component="img"
          height="200"
          image={imgSrc}
          onError={() => setImgSrc(noImage)}
          alt={`Live video from ${data.name}`}
          sx={{ objectFit: "cover" }}
        />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
            Live video feed from <b>{data.name}</b> Camera
          </Typography>

          <DesBtn text="Open Full Screen" noBoarder handle={openFullScreen} disabled={!imgSrc}>
            <FullscreenIcon />
          </DesBtn>

          {streaming ? (
            <DesBtn text="Stop Stream" noBoarder handle={stopStream}>
              <PauseCircleIcon />
            </DesBtn>
          ) : (
            <DesBtn text="Start Stream" noBoarder handle={startStream}>
              <PlayCircleFilledIcon />
            </DesBtn>
          )}
        </CardContent>
      </Card>

      <Dialog open={openPopup} onClose={closeFullScreen} fullWidth maxWidth="md">
        <DialogTitle>Full Screen {data.name} Video</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia
              component="img"
              height="400"
              image={imgSrc}
              onError={() => setImgSrc(noImage)}
              alt={`Fullscreen video from ${data.name}`}
              sx={{ objectFit: "cover" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeFullScreen}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WebSocketComponent;
