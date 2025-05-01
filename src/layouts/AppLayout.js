import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TopNav from "../Components/Navbar/TopNav";
import SideNav from "../Components/Navbar/SideNav";
import { Outlet, Navigate } from "react-router-dom";
import PopUpReusable from "../Components/PopUp/PopUpReusable";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";
import SubscriptionWarningCard from "../Components/Cards/SubscriptionWarningCard";
import { drawerWidth } from "../utils/StaticVariables";
import { isActiveUserState } from "../Recoil/RecoilState";
import TokenCheck from "../Components/Auth/TokenCheck";

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);
  const [isActiveUserRecoil] = useRecoilState(isActiveUserState);
  
  useEffect(() => {
    if (localStorage?.token && !authRecoil?.token) {
      setAuthRecoil({
        isAuthenticated: true,
        expire: localStorage.expire,
        token: localStorage.token,
      });
    }
  }, [authRecoil, setAuthRecoil]);

  if (!authRecoil?.token) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex", overflow: "hidden" }}>
      <TokenCheck />
      <SideNav
        openHandel={() => setMobileOpen(!mobileOpen)}
        mobileOpen={mobileOpen}
        drawerWidth={drawerWidth}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: "100vw", position: "relative" }}
      >
        <TopNav openHandel={() => setMobileOpen(!mobileOpen)} />
        <Toolbar />
        {!isActiveUserRecoil && <SubscriptionWarningCard />}
        <Outlet />
        <PopUpReusable />
      </Box>
    </Box>
  );
};

export default AppLayout;
