import Info from "../Components/Auth/Info";
import LogIn from "../Components/Auth/LogIn";
import { Stack, Box } from "@mui/system";
import Otp from "../Components/Auth/Otp";

const Welcome = () => {



  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="stretch" alignItems="stretch" gap={4}
      sx={{
        minHeight: "100vh",
        p: 4
      }}
    >
      <Info />
      <Box sx={{
        width: { md: "50%" },
        minHeight: { xs: "50%", md: "100%" },
      }} >
        <Box sx={{ margin : "auto",width  : {xl :"60%"} ,height : "100%"}}>

        <LogIn />
        </Box>
        {/* <Otp /> */}
      </Box>
    </Stack>
  );
};

export default Welcome;
