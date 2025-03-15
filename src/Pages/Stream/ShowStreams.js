import { useEffect, useState } from "react";
import { authState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const WebSocketComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  const [authRecoil] = useRecoilState(authState);

  useEffect(() => {
//     const socket = new WebSocket(`ws://16.170.216.227/stream?session_id=${authRecoil.token}`);
    const socket = new WebSocket(`ws://16.170.216.227/stream?session_id=${authRecoil.token}&stream_id=e1cb4c46-e95e-4dc2-942b-860431bdeed9"
"}`);

    socket.onopen = () => {
      console.log("WebSocket Connected");
    };

    socket.onmessage = (event) => {
     
      console.log("Message received:", event.data);
      setMessages( event.data);
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
     {messages }
    
    </div>
  );
};

export default WebSocketComponent;
