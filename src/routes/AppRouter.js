import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";

// Auth Pages
import Login from "../Pages/auth/LogIn";
import Contact from "../Pages/auth/Contact";
// import Otp from "../Pages/auth/Otp";

// Dashboard Pages
import Dashboard from "../Pages/Dashboard";
import Streams from "../Pages/Stream/Streams";
import AddStream from "../Pages/Stream/AddStream";
import ShowStreams from "../Pages/Stream/ShowStreams";
import UpdateStreams from "../Pages/Stream/UpdateStreams";
import Search from "../Pages/Search";
import Logs from "../Pages/Logs";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";
import { useEffect } from "react";

const AppRouter = () => {
  const [authRecoil , setAuthRecoil] = useRecoilState(authState);

useEffect(() => {
    if (localStorage?.token && !authRecoil?.token) {
      setAuthRecoil({
        isAuthenticated: true,
        expire: localStorage.expire,
        token: localStorage.token,
      })
    }

  }, [authRecoil?.token, setAuthRecoil])
  


  return (
    <Router>
      <Routes>
        {!authRecoil?.token ? (
          // Unauthenticated Routes
          <>
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              {/* <Route path="/otp" element={<Otp />} /> */}
              <Route path="/" element={<Navigate to="/login" />} />
            </Route>
          </>
        ) : (
          // Authenticated Routes
          <>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/streams" element={<Streams />} />
              <Route path="/streams/add-stream" element={<AddStream />} />
              <Route path="/streams/show-streams" element={<ShowStreams />} />
              <Route path="/streams/update-streams" element={<UpdateStreams />} />
              <Route path="/frames-search" element={<Search />} />
              <Route path="/logs" element={<Logs />} />
            </Route>
          </>
        )}

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
