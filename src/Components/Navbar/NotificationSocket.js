import React, { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  ListItemText,
  Divider
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useNotificationWebSocket from "../../hooks/useNotificationWebSocket";

const NotificationMenu = ({ token }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  // Handle new incoming WebSocket messages
  useNotificationWebSocket({
    onMessage: (data) => {
      const message = {
        id: Date.now(),
        content: `${data.type} @ ${new Date().toLocaleTimeString()}`,
      };
      setNotifications((prev) => [message, ...prev]);
    },
  });

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 300 } }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>
        <Divider />
        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((note) => (
            <MenuItem key={note.id}>
              <ListItemText primary={note.content} />
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
