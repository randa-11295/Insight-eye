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
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../Recoil/RecoilState";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const wasOpened = useRef(false);

  const { token } = useRecoilValue(authState);
  const open = Boolean(anchorEl);

  const handleOpen = async (event) => {
    setAnchorEl(event.currentTarget);
    wasOpened.current = true;
    await fetchNotifications();
    setUnreadCount(0);
  };

  const handleClose = () => {
    setAnchorEl(null);
    wasOpened.current = false;
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("/notify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        const newItems = response.data.map((item) => ({
          id: item.id || Date.now(),
          content: item.type,
          timestamp: new Date().toLocaleTimeString(),
        }));

        setNotifications(newItems);
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 320, height: "65vh", overflowY: "auto" } }}
      >
        <Typography variant="subtitle1" sx={{ px: 2, py: 1 }}>
          Notifications
        </Typography>
        <Divider />

        {notifications.length === 0 ? (
          <MenuItem disabled>No new notifications</MenuItem>
        ) : (
          notifications.map((note, index) => (
            <MenuItem
              key={note.id + "-" + index}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                whiteSpace: "normal",
                gap: 0.5,
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                🔔 {note.content || "No content available"}
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
