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
    const newRoute = location.pathname.split("/")[1]?.replaceAll("-", " ");
    if (newRoute) {
      setRoute(`${newRoute}`);
    } else {
      setRoute("Dashboard");
    }
  }, [location.pathname]);


  return (
  
      <Toolbar
        sx={{
          borderBottom: (theme) => `5px solid ${theme.palette.primary.main}`, // Use MUI theme secondary color
        }}
      >
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
          sx={{ flexGrow: 1, textTransform: "capitalize", fontSize: {xs :"1.5rem" , md : "2rem " , lg : "3rem"} }}
          component="h6"
        >
          {route}
        </Typography>
      </Toolbar>
 
  );
};

export default TopNav;
