import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);

  useEffect(() => {
    const streamid = "226d039d-87a4-495f-a8be-5f6b39a09fff";
    // const token = authRecoil?.token || localStorage.getItem("token");
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbmRhQDEyOTUiLCJleHAiOjE3NDQxMzcyOTguODY0MTE4LCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY3JlYXRlZF9hdCI6MTc0NDA0NzI5OC44NjQxMjd9.5CVAtD0JNpolBuZyLpxkz900Ut9gafZJ0QbhQI-Dnys";

    const streamUrl = `ws://16.170.216.227/stream?stream_id=${streamid}&token=${token}`;
    const socket = new WebSocket(streamUrl);

    socket.onopen = () => {
      console.log("✅ WebSocket Connected");
    };

    socket.onmessage = (event) => {
      console.log("📨 Message received:", event.data);
      setMessages(event.data);
    };

    socket.onerror = (error) => {
      console.error("❌ WebSocket Error:", error);
    };

    socket.onclose = () => {
      console.log("🔌 WebSocket Disconnected");
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [authRecoil.token]);

  return (
    <div>
      <h2>WebSocket Messages</h2>
      <pre>{messages}</pre>
    </div>
  );
};

export default WebSocketComponent;
