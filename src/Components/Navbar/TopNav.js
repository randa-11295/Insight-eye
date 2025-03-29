import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation } from "react-router-dom";

const TopNav = (props) => {
  let location = useLocation();
  const [name] = useState(<PersonOutlineIcon />);
  const [route, setRoute] = useState("");





  useEffect(() => {
    const newRoute = location.pathname.split("/")[1]?.replaceAll("-" ," ");
    if (newRoute) {
      setRoute(
      (`${newRoute}`)
      );
    } else {
      setRoute("Dashboard");
    }

  }, [location.pathname]);

  const navStyle = {
    width: { md: `calc(100% - ${props.drawerWidth}px)` },
    m: "auto",
  };

  return (
    <AppBar position="fixed"  sx={navStyle}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={props.openHandel}
          sx={{ display: { md: "none" } }}
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
       
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
