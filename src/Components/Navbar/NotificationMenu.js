import { useState } from "react";
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
  Box,
  CircularProgress,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { authState, notificationHasUnread } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [hasUnread, setHasUnread] = useRecoilState(notificationHasUnread);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useRecoilValue(authState);
  const open = Boolean(anchorEl);

  const handleOpen = async (e) => {
    setAnchorEl(e.currentTarget);
    setHasUnread(false); // remove red dot
    await fetchNotifications();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setError(""); // clear error when closed
  };

  const fetchNotifications = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(`${baseURL}/notify`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.status === "success") {
        const parsed = data.notifications.map((n) => ({
          id: n.id,
          message: n.message,
          timestamp: new Date(n.timestamp * 1000),
          read: n.read,
        }));

        setNotifications(parsed);
  
      } else {
        setError("Failed to load notifications");
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) =>
    `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

  return (
    <>
      <IconButton color="inherit" onClick={handleOpen}>
        <Badge
          variant="dot"
          color="error"
          overlap="circular"
          invisible={!hasUnread}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 360, maxHeight: "65vh", overflowY: "auto" },
        }}
      >
        <List
          subheader={
            <ListSubheader component="div" sx={{ py: 1 }}>
              <Typography variant="h6">Notifications</Typography>
            </ListSubheader>
          }
        >
          {loading && (
            <ListItem>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} />
                <Typography variant="body2">Loading...</Typography>
              </Box>
            </ListItem>
          )}

          {error && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography color="error" variant="body2">
                    {error}
                  </Typography>
                }
              />
            </ListItem>
          )}

          {!loading && !error && notifications.length === 0 && (
            <ListItem>
              <ListItemText primary="No notifications" />
            </ListItem>
          )}

          {!loading &&
            !error &&
            notifications.map((note) => (
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
