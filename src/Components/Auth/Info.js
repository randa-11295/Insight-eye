import logo from "../../Images/logo.png"
import bg from "../../Images/infobg.jpg"
import { Box, Stack, Typography } from "@mui/material";

const Info = () => {
     return (
          <Stack sx={boxStyle} >

               <Box sx={logoStyle}   >
                    <img src={logo} alt="Logo" />
               </Box>
               <Stack sx={contentStyle}>
                    <Typography
                         variant="h1"
                         sx={titleStyle}
                    >
                         Welcome in INSIGHT EYE
                    </Typography>

                    <Typography
                         variant="body1"
                         sx={desStyle}
                    >
                         Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation of graphic elements in documents, without the need for formal copy. Using Lorem Ipsum allows designers to put together layouts and the form of the content before the content has been created, giving the design and production process more freedom.

                         It is widely believed that the history of Lorem Ipsum originates with Cicero in the 1st Century BC and his text De
                    </Typography>
               </Stack>
          </Stack>
     )
}

export default Info

const boxStyle = {
     width: { md: "50%" },
     minHeight: { xs: "50%", md: "100%" },
     p: 4,
     backgroundImage: `url(${bg})`,
     backgroundSize: "cover",
     backgroundPosition: "left",
     border: 3,
     borderRadius: 5,
     borderColor: "primary.main"
}


const logoStyle = {
     width: { xs: "40%", sm: "25%", md: "20%" }, // Responsive width
     display: "flex",
     justifyContent: "center",

     "& img": {
          width: "100%",
          height: "auto",
          objectFit: "contain",
     },
}
const contentStyle = { textAlign: { xs: "center", md: "left " }, p: 2, flexGrow: 1, justifyContent: "center" }

const titleStyle = {
     fontSize: { xs: "24px", sm: "32px", md: "40px", lg: "4rem" }, // Responsive font sizes
     fontWeight: "bold",

}

const desStyle = {
     fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font sizes
     color: "text.secondary",
     mt: 4,
}