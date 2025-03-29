import logo from "../../Images/logo.png";
import bg from "../../Images/infobg.jpg";
import { Box, Stack, Typography } from "@mui/material";
import SocialMediaLinks from "./SocialMediaLinks";
const Info = () => {
  return (
    <Stack sx={boxStyle} justifyContent={"space-between"} alignItems="center">
      <Box sx={logoStyle}>
        <img src={logo} alt="Logo" />
      </Box>

      <Stack sx={contentStyle}>
        <Typography variant="h2" sx={titleStyle}>
          Welcome to
        </Typography>
        <Typography variant="h1" my={3} sx={companytitleStyle}>
        INSIGHTEYE
        </Typography>
        <Typography component="p" sx={desStyle} variant="body2" color="text.secondary">
          Count - Predict - Visualize
        </Typography>
      </Stack>

      <SocialMediaLinks />
    </Stack>
  );
};

export default Info;

const boxStyle = {
  width: { md: "50%" },
  minHeight: "600px",
  p: 4,
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "left",
  border: 3,
  borderRadius: 5,
  borderColor: "primary.main",
};

const logoStyle = {
  width: { xs: "40%", lg: "28%" }, // Responsive width
  display: "flex",
  justifyContent: "center",

  "& img": {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  },
};
const contentStyle = {
  textAlign: "center",
  p: 2,

  justifyContent: "center",
};

const titleStyle = {
  fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5", lg: "3rem" },
};

const companytitleStyle = {
  fontSize: { xs: "3rem", sm: "4rem", md: "3rem", lg: "5rem" ,  xl : "6rem" }, 
  fontWeight : 900 
};
const desStyle = {
  fontSize: "1.3rem",
};
