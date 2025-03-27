import logo from "../../Images/logo.png";
import bg from "../../Images/infobg.jpg";
import { Box, Stack, Typography } from "@mui/material";
import SocialMediaLinks from "./SocialMediaLinks"
const Info = () => {
  return (
    <Stack sx={boxStyle}>
      <Box sx={logoStyle}>
        <img src={logo} alt="Logo" />
      </Box>
      <Stack sx={contentStyle}>
        <Typography variant="h1" sx={titleStyle}>
          Welcome in <br /> INSIGHTEYE
        </Typography>

        <Typography component="ul"  sx={desStyle}>
          <Typography component="li" sx={desStyle }>Count

</Typography>
          <Typography component="li" sx={desStyle} >Predict </Typography>
          <Typography component="li" sx={desStyle}> Visualize </Typography>
        </Typography>
      </Stack>
      <SocialMediaLinks/>
    </Stack>
  );
};

export default Info;

const boxStyle = {
  width: { md: "50%" },
  minHeight: { xs: "50%", md: "100%" },
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
  textAlign: { xs: "center", md: "left " },
  p: 2,
  flexGrow: 1,
  justifyContent: "center",
};

const titleStyle = {
  fontSize: { xs: "24px", sm: "32px", md: "40px", lg: "4rem" }, // Responsive font sizes
  fontWeight: "bold",
};

const desStyle = {
  fontSize: "1.3rem", // Responsive font sizes
m :1
};
