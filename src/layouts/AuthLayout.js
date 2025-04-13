import { Stack, Box } from "@mui/system";
import Info from "../Components/Auth/Info";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      justifyContent="stretch"
      alignItems="stretch"
      gap={4}
      sx={{ minHeight: "100vh", p: 4 }}
    >
      <Info />
      <Box
        sx={{
          width: { md: "50%" },
          minHeight: { xs: "50%", md: "100%" },
        }}
      >
        <Box sx={{ margin: "auto", width: { xl: "60%" }, height: "100%" }}>
          <Outlet />
        </Box>
      </Box>
    </Stack>
  );
};

export default AuthLayout;
