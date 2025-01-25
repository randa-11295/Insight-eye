import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../Pages/Home";
import Dashboard from "../Pages/Dashboard";
import Stream from "../Pages/Stream/Stream"
export const AppRouter = () => {

  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/search" element={<h1>search</h1>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
