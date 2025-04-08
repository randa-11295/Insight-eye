import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import {Card , Typography , CardContent , CardMedia , Box , Divider} from "@mui/material";
import { BASE64_IMAGE_PREFIX } from "../../utils/StaticVariables";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);

  useEffect(() => {
    console.log(localStorage.token);
    const token = localStorage.token;
    const streamid = "226d039d-87a4-495f-a8be-5f6b39a09fff";
    
    const streamUrl = `ws://16.170.216.227/stream?stream_id=${streamid}&token=${token}`;
    const socket = new WebSocket(streamUrl);
    
    socket.onopen = () => {
      console.log("WebSocket Connected");
    };
    socket.onmessage = (event) => {
      console.log("Message received:", event.data);
    
      // Parse the JSON string into an object
      try {
        const messageObj = JSON.parse(event.data);
        console.log("Parsed message:", messageObj);
    
        // Example: accessing stream_id and frame
        console.log("Stream ID:", messageObj?.stream_id);
        console.log("Frame Data:", messageObj?.frame);
    
        // Set state or handle the data as needed
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

    return () => {
      socket.close();
    };
  }, [authRecoil.token]); // Reconnect if userId changes

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <CardMedia
          component="img"
          height="200"
          image={BASE64_IMAGE_PREFIX + messages?.frame}
          alt={messages?.frame}
          sx={{ objectFit: "cover" }}
        />
    </div>
  );
};

export default WebSocketComponent;
