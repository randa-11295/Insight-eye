import {
  IconButton,
  Menu,
  Avatar,
  MenuList,
  Stack,
  ListItemIcon,
  Typography,
  MenuItem,

} from "@mui/material";
import { useState, } from "react";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";


export default function MenuNav(props) {

  const isNotLoggedIn = true;
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandel = () => {
    localStorage.removeItem("token");

  };

  const logInHandle = () => {
    console.log("log in")
  };




  return (
    <Stack direction="row" spacing={2} alignItems="center">


      <IconButton onClick={handleClick}>
        <Avatar sx={iconStyle}>{props.name}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList>
          <MenuItem onClick={isNotLoggedIn ? logoutHandel : logInHandle}>
            <Typography sx={{ pr: 1 }} variant="inherit">
              {
                isNotLoggedIn ? "logout" : "login"
              }
            </Typography>
            <ListItemIcon>
              {isNotLoggedIn ? (
                <LogoutIcon fontSize="small" sx={{ ml: "auto" }} />
              ) : (
                <LoginIcon fontSize="small" sx={{ ml: "auto" }} />
              )}
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}

const iconStyle = {
  bgcolor: { xs: "#fff", md: "secondary.main" },
  color: { xs: "secondary.main", md: "#fff" },
  width: 35,
  height: 35,
  textTransform: "uppercase",
};
