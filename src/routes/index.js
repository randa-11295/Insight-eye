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
          <Route path="/streams" element={<Stream />} >
          {/* Nested Route for Add Product */}
          <Route path="add-product" element={<h1>test</h1>} />
        </Route>
          <Route path="/search" element={<h1>search</h1>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
};
