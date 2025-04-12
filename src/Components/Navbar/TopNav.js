import { IconButton, Toolbar, Typography, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DesBtn from "../Reusable/DesBtn";
const TopNav = (props) => {
  let location = useLocation();
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
        <DesBtn text="Notifications" noBoarder>
          <NotificationsIcon sx={{ fontSize: { md: "2rem", lg: "2.5rem" } }} />
        </DesBtn>
      </Stack>
    </Toolbar>
  );
};

export default TopNav;
