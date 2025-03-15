import { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TopNav from "../Components/Navbar/TopNav";
import SideNav from "../Components/Navbar/SideNav";
import { Outlet } from "react-router-dom";
import SnackAlert from "../Components/PopUp/SnackAlert";
import PopUpReusable from "../Components/PopUp/PopUpReusable"
import Welcome from "./Welcome";
import { authState } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const drawerWidth = 280;

function Home() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);
  const openHandel = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthRecoil({
        isAuthenticated: true,
        username: localStorage.username,
        token: localStorage.token,
      })
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div>
      {!authRecoil.token ? <Welcome /> : <Box sx={{ display: "flex", overflow: "hidden" }}>
        <TopNav openHandel={openHandel} drawerWidth={drawerWidth} />
        <SideNav
          openHandel={openHandel}
          mobileOpen={mobileOpen}
          drawerWidth={drawerWidth}
        />
        <Box component="main" sx={BoxStyle}>
          <Toolbar />
          <Outlet />
        </Box>

        <PopUpReusable />
      </Box>
      }
      <SnackAlert />
    </div>
  );
}

export default Home;

const BoxStyle = {
  flexGrow: 1,
  p: 3,
  width: { xs: "100vw", md: `calc(100% - ${drawerWidth}px)` },
};
