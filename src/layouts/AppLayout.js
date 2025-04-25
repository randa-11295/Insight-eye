import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TopNav from "../Components/Navbar/TopNav";
import SideNav from "../Components/Navbar/SideNav";
import { Outlet, Navigate } from "react-router-dom";
import SnackAlert from "../Components/PopUp/SnackAlert";
import PopUpReusable from "../Components/PopUp/PopUpReusable";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";
import SubscriptionWarningCard from "../Components/Cards/SubscriptionWarningCard";
const drawerWidth = 280;

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);

  useEffect(() => {
    if (localStorage?.token && !authRecoil?.token) {
      setAuthRecoil({
        isAuthenticated: true,
        expire: localStorage.expire,
        token: localStorage.token,
      });
    }
  }, [authRecoil]);

  if (!authRecoil?.token) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <SideNav
        openHandel={() => setMobileOpen(!mobileOpen)}
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3, width: "100vw" }}>
        <TopNav openHandel={() => setMobileOpen(!mobileOpen)} />
        <Toolbar />
        <SubscriptionWarningCard />
        <Outlet />
        <PopUpReusable />
      </Box>
      <SnackAlert />
    </Box>
  );
};

export default AppLayout;
