import Info from "../Components/Auth/Info";
import LogIn from "../Components/Auth/LogIn";
import { Stack } from "@mui/system";

const Welcome = () => {



  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="stretch" alignItems="stretch" gap={4}
      sx={{
        height: "100vh",
        p: 4
      }}
    >
      <Info />

    <LogIn />
    </Stack>
  );
};

export default Welcome;
