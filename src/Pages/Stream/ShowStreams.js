import { Box } from "@mui/material";
import StreamCards from "../../Components/Stream/StreamCards";

const WebSocketComponent = ({ userId }) => {
  return (
    <div>
      <h2>WebSocket Video Stream</h2>
      <Box sx={{ width: "25%", py: 2 }}>
        <StreamCards />
      </Box>
      {/* Video display */}
    </div>
  );
};

export default WebSocketComponent;
