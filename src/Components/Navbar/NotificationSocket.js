import React, { useState, useRef } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Divider,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import useNotificationWebSocket from "../../hooks/useNotificationWebSocket";

const NotificationMenu = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const open = Boolean(anchorEl);
  const wasOpened = useRef(false); 

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setUnreadCount(0); 
    wasOpened.current = true;
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useNotificationWebSocket({
    onMessage: (data) => {
     console.log("Notification data:", data);
      const message = {
        id: Date.now(),
        content: data?.type,
        timestamp: new Date().toLocaleTimeString(),
      };

      setNotifications((prev) => [message, ...prev]);

      if (!wasOpened.current || anchorEl === null) {
        setUnreadCount((prev) => prev + 1);
      }
    },
  });

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
      sx={{height: "65vh", overflowY: "auto"}}
        anchorEl={anchorEl}
        open={open}
        onClose={() => {
          handleClose();
          wasOpened.current = false;
        }}
        PaperProps={{ sx: { width: 320 } }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>
        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((note , indx) => (
            <MenuItem
              key={note.type + note.timestamp + indx}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                whiteSpace: "normal",
                gap: 0.5,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                🔔 {note.content ||  "No content available"}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: "0.75rem" }}
              >
                {note.timestamp}
              </Typography>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default NotificationMenu;
