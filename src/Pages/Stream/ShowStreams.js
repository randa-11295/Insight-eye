import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);

  useEffect(() => {
    console.log(localStorage.token);
    const streamid = "226d039d-87a4-495f-a8be-5f6b39a09fff";
    const streamUrl = "ws://16.170.216.227/stream?stream_id=" + streamid;
    //     const socket = new WebSocket(`ws://16.170.216.227/stream?session_id=${authRecoil.token}`);
    const socket = new WebSocket(streamUrl);
    const testToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbmRhQDEyOTUiLCJleHAiOjE3NDM4NDQ2OTMuODk0MDE5LCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY3JlYXRlZF9hdCI6MTc0Mzc1NDY5My44OTQwMjl9.a14MtYZGHdaRwxnu-LhXFx-QPZl7LraK3VvVLvXAJP4";
    socket.onopen = () => {
      console.log("WebSocket Connected", {
        headers: {
          Authorization: `Bearer ${testToken}`,
        },
      });
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event);
      setMessages(event.data);
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
      {messages}
    </div>
  );
};

export default WebSocketComponent;
