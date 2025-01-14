import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuNav from "../Navbar/MenuNav";
import { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation } from "react-router-dom";

const TopNav = (props) => {
  let location = useLocation();
  const [name] = useState(<PersonOutlineIcon />);
  const [route, setRoute] = useState("");





  useEffect(() => {
    const newRoute = location.pathname.split("/")[1]?.replaceAll("-" ,"_");
    if (newRoute) {
      setRoute(
      (`${newRoute}`)
      );
    } else {
      setRoute("home");
    }

  }, [location.pathname]);

  const navStyle = {
    width: { md: `calc(100% - ${props.drawerWidth}px)` },
    m: "auto",
    background: { md: "#fff" },
    color: { md: "#000" },
  };

  return (
    <AppBar position="fixed" color="secondary" sx={navStyle}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.openHandel}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, textTransform: "capitalize" }}
          component="h6"
        >
          {route}
        </Typography>
        <MenuNav name={name} />
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
