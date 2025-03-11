import Info from "../Components/Auth/Info";
import LogIn from "../Components/Auth/LogIn";
import { Stack, Box } from "@mui/system";
import Otp from "../Components/Auth/Otp";

const Welcome = () => {



  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="stretch" alignItems="stretch" gap={4}
      sx={{
        height: "100vh",
        p: 4
      }}
    >
      <Info />
      <Box sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },
      }} >
        <Otp />
      </Box>
    </Stack>
  );
};

export default Welcome;
