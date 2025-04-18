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
import { streamState } from "../Recoil/RecoilState";
import axios from "axios";
import { baseURL } from "../utils/StaticVariables";
import { useSetRecoilState } from "recoil";

const drawerWidth = 280;

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authRecoil, setAuthRecoil] = useRecoilState(authState);
  const setStreamRecoil = useSetRecoilState(streamState);

  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    setStreamRecoil((prev) => ({ ...prev, loading: true }));
    try {
      const { data } = await axios.get(`${baseURL}source`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setStreamRecoil({
        data,
        selected: data.map((s) => s.id),
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error("Error fetching stream data:", err);
      setStreamRecoil((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load camera list. Please try again.",
      }));
    }
  };

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
        <Outlet />
        <PopUpReusable />
      </Box>
      <SnackAlert />
    </Box>
  );
};

export default AppLayout;
