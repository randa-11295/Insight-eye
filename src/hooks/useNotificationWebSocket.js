import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { authState } from "../Recoil/RecoilState";

const useNotificationWebSocket = ({ onMessage }) => {
  const { token } = useRecoilValue(authState);
  const wsRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const ws = new WebSocket(`wss://16.170.216.227/notify?token=${token}`);
    wsRef.current = ws;

    const handleClose = (reason) => {
      // console.error("WebSocket closed:", reason);
      ws.close();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.status === "error") handleClose(data.message);
        else onMessage(data);
      } catch (err) {
        handleClose("Invalid JSON message");
      }
    };

    ws.onerror = (err) => handleClose("WebSocket error");

    return () => ws.close();
  }, [token, onMessage]);
};

export default useNotificationWebSocket;
