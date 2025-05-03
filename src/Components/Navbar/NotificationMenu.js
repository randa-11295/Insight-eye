// NotificationMenu.jsx
import  { useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Divider,
  Typography,
  Button,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { token } = useRecoilValue(authState);
  const open = Boolean(anchorEl);

  const handleOpen = async (e) => {
    setAnchorEl(e.currentTarget);
    await fetchNotifications();
  };
  const handleClose = () => setAnchorEl(null);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/notify`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.status === "success") {
        setUnreadCount(data.count);
        setNotifications(
          data.notifications.map((n) => ({
            id: n.id,
            message: n.message,
            timestamp: new Date(n.timestamp * 1000),
            read: n.read,
          }))
        );
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };

  const markAllRead = () => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const formatTime = (date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge badgeContent={unreadCount} color="error" overlap="circular">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { width: 360, maxHeight: "65vh", overflowY: "auto" } }}
      >
        <List
          subheader={
            <ListSubheader
              component="div"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1,
              }}
            >
              <Box>
                <Typography variant="h6">Notifications</Typography>
                <Typography variant="caption" color="text.secondary">
                  {unreadCount} new
                </Typography>
              </Box>
              <Button size="small" onClick={markAllRead}>
                Mark all read
              </Button>
            </ListSubheader>
          }
        >
          {notifications.length === 0 && (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          )}

          {notifications.map((note) => (
            <div key={note.id}>
              <ListItem
                alignItems="flex-start"
                sx={{
                  borderLeft: note.read
                    ? "4px solid transparent"
                    : (theme) => `4px solid ${theme.palette.primary.main}`,
                  backgroundColor: note.read
                    ? "inherit"
                    : "rgba(16,170,157,0.1)",
                  mb: 0.5,
                }}
              >
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      fontWeight={note.read ? 400 : 600}
                    >
                      {note.message}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {formatTime(note.timestamp)}
                    </Typography>
                  }
                />
              </ListItem>
              <Divider component="li" />
            </div>
          ))}
        </List>
      </Menu>
    </>
  );
};

export default NotificationMenu;
