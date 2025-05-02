import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";

const useNotificationWebSocket = ({ onMessage }) => {
  const [token] = useRecoilState(authState);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`wss://16.170.216.227/notify?token=${token}`);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (err) {
        console.error("Invalid message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      ws.close();
    };
  }, [token, onMessage]);
};

export default useNotificationWebSocket;
