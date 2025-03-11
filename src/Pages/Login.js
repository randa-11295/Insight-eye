import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, Stack, CardContent, Typography } from "@mui/material";
import { baseURL } from "../utils/StaticVariables";
import { authState } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { Box, useTheme } from "@mui/material";
import logo from "../Images/logo.png"
import bg from "../Images/logbg.jpg"


const Login = () => {
  const theme = useTheme();
  const [, setAuthRecoil] = useRecoilState(authState);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values)

      axios.post(baseURL + "/login", values, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        }
      })
        .then(response => {
          console.log("Login Successful:", response.data);
          localStorage.setItem("token", response.data.session_id);
          setAuthRecoil({
            isAuthenticated: true,
            username: response.data.username,
            token: response.data.session_id,
          });
        })
        .catch(error => {
          console.error("Login Failed:", error);
        })
        .finally(() => {
          console.log("Login request completed.");
        });
    },
  });

  return (
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="stretch" alignItems="stretch" gap={4}
      sx={{
        height: "100vh",
p : 4
        // background: `linear-gradient(135deg, ${theme.palette.primary.main} 25%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Stack sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },
        p: 4, 
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "left",
      border : 3,
      borderRadius : 5, 
      borderColor : "primary.main"
      }}>
          
       
        <Box
          sx={{
            width: { xs: "40%", sm: "25%", md: "20%" }, // Responsive width
            display: "flex",
            justifyContent: "center",
            
            "& img": {
              width: "100%",
              height: "auto",
              objectFit: "contain",
            },
          }}
        >
          <img src={logo} alt="Logo" />
        </Box>
        <Stack sx={{ textAlign: { xs: "center", md: "left " }, p: 2, flexGrow: 1, justifyContent : "center"}}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "24px", sm: "32px", md: "40px", lg: "4rem" }, // Responsive font sizes
              fontWeight: "bold",

            }}
          >
            Welcome in INSIGHT EYE
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "14px", sm: "16px", md: "18px" }, // Responsive font sizes
              color: "text.secondary",
              mt: 4,
            }}
          >
            Lorem ipsum was conceived as filler text, formatted in a certain way to enable the presentation of graphic elements in documents, without the need for formal copy. Using Lorem Ipsum allows designers to put together layouts and the form of the content before the content has been created, giving the design and production process more freedom.

            It is widely believed that the history of Lorem Ipsum originates with Cicero in the 1st Century BC and his text De 
          </Typography>
        </Stack>
      </Stack>
      <Box sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },

        // background: "darkblue",
      }} >

        <CardContent component="form" onSubmit={formik.handleSubmit}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>

          <TextField
            fullWidth
            label="username"
            variant="outlined"
            margin="normal"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            required
          />
          <Button fullWidth variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
            Login
          </Button>

        </CardContent>
      </Box>
    </Stack>
  );
};

export default Login;
