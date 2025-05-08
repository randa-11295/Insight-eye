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
import noImage from "../../Images/no-image.jpeg";
import loaderSrc from "../../Images/loading.jpg";
import { popupState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import { notificationHasUnread } from "../../Recoil/RecoilState";
import { streamUrl } from "../../utils/StaticVariables";
const WebSocketComponent = ({ data }) => {
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);
  const [openPopup, setOpenPopup] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [loader, setLoader] = useState(false);
  const [imgSrc, setImgSrc] = useState(noImage);
  const setPopup = useSetRecoilState(popupState);
  const setHasUnread = useSetRecoilState(notificationHasUnread);

  useEffect(() => {
    if (data.static_base64) {
      setImgSrc(BASE64_IMAGE_PREFIX + data.static_base64);
    }

    if (data.is_streaming === true) {
      startStream()
    }
  }, [data]);

  const startStream = useCallback(
    () => {
      const token = authRecoil.token;
      const newStreamUrl = `wss://16.170.216.227/insighteye/stream?stream_id=${data.id}&token=${token}`;
      const socket = new WebSocket(newStreamUrl);
      setLoader(true);

      socket.onopen = () => {
        setStreaming(true);
        setHasUnread(true);
        setLoader(false);
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
        setImgSrc(noImage);
      };

      socket.onclose = () => {
        setStreaming(false);
        setLoader(false);
      };

      setWs(socket);
    },
    [authRecoil, data]
  );

  const stopStream = async () => {
    if (ws) ws.close();
    setWs(null);
    setStreaming(false);
    setHasUnread(true);
    setLoader(true);
    try {
      await axios.post(
        `${baseURL}stop_stream/${data.id}`,
        {},
        { headers: { Authorization: `Bearer ${authRecoil.token}` } }
      );
      setLoader(false);
    } catch (err) {
      setLoader(false);
      setImgSrc(noImage);
    }
  };

  const openReusablePopup = () => {
    setPopup({
      isOpen: true,
      title: "Stop Stream",
      content: (
        <div>
          <h3>Are you sure you want to stop the stream?</h3>
          <Typography variant="body2" color="text.secondary" mt={2}>
            Stopping stream will cause stopping the model from receiving frames
            from the cameras live stream. There is no more data will be stored
            for the number of people until you click on start stream button
            again.
          </Typography>
        </div>
      ),

      sendReq: stopStream,
    });
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
          image={loader ? loaderSrc : imgSrc}
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ flexGrow: 1 }}
          >
            Live video feed from <b>{data.name}</b> Camera
          </Typography>

          <DesBtn
            text="Open Full Screen"
            noBoarder
            handle={openFullScreen}
            disabled={!imgSrc}
          >
            <FullscreenIcon />
          </DesBtn>

          {streaming ? (
            <DesBtn text="Stop Stream" noBoarder handle={openReusablePopup}>
              <PauseCircleIcon />
            </DesBtn>
          ) : (
            <DesBtn
              text="Start Stream"
              noBoarder
              handle={startStream}
              disabled={loader}
            >
              <PlayCircleFilledIcon />
            </DesBtn>
          )}
        </CardContent>
      </Card>

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
