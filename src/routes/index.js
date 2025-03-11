import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import AddStream from "../Pages/Stream/AddStream";
import UpdateStreams from "../Pages/Stream/UpdateStreams";
import Search from "../Pages/Search"
import Stream from "../Pages/Stream/Streams"
import ShowStreams from "../Pages/Stream/ShowStreams";
import Login from "../Pages/Welcome";
import Contact from "../Pages/Contact";

export const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/streams" element={<Stream />} />
          <Route path="/streams/add-stream" element={<AddStream />} />
          <Route path="/streams/show-streams" element={<ShowStreams />} />
          <Route path="/streams/update-streams" element={<UpdateStreams />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/Contact-with-us" element={<Contact />} />
          <Route path="/frames-search" element={<Search />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
