import { IconButton, Toolbar, Typography, Stack, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { drawerWidth } from "../../utils/StaticVariables";
import NotificationMenu from "./NotificationMenu";

const TopNav = (props) => {
  let location = useLocation();
  const [route, setRoute] = useState("");

  useEffect(() => {
    const newRoute = location.pathname.split("/")[location.pathname.split("/").length - 1]?.replaceAll("-", " ");

    if (newRoute) {
      setRoute(`${newRoute}`);
    } else {
      setRoute("Dashboard");
    }
  }, [location.pathname]);

  return (
    <Toolbar
      sx={(theme) => ({
        position: "fixed",
        left: { md: `${drawerWidth}px`, xs: 0 }, // shift right on large screens
        width: { md: `calc(100% - ${drawerWidth}px)`, xs: "100%" }, // full width on xs, reduced on md+
        zIndex: 10,
        top: 0,
        backgroundColor: theme.palette.background.default, // ← same as your page
      })}
    >
      <Box
        sx={(theme) => ({
          display: {
            xs: "flex",
            width: "100%",
            borderBottom: `5px solid ${theme.palette.secondary.main}`,
          },
        })}
      >
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={props.openHandel}
          sx={{ display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          sx={{ flexGrow: 1 }}
        >
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              textTransform: "capitalize",
              fontSize: { xs: "1.5rem", md: "2rem ", lg: "3rem" },
            }}
            component="h6"
          >
            {route}
          </Typography>
         
          <NotificationMenu /> 
        </Stack>
      </Box>
    </Toolbar>
  );
};

export default TopNav;
