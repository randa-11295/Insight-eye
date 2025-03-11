import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, Stack, CardContent, Typography } from "@mui/material";
import { baseURL } from "../utils/StaticVariables";
import { authState } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { Box, useTheme } from "@mui/material";
import logo from "../Images/logo.png"
import { width } from "@mui/system";

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
    <Stack direction={{ xs: "column", md: "row" }} justifyContent="stretch" alignItems="stretch"
      sx={{
        height: "100vh",

        // background: `linear-gradient(135deg, ${theme.palette.primary.main} 25%, ${theme.palette.secondary.main} 100%)`,
      }}
    >
      <Box sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },
        background: "gray",
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
      </Box>
      <Box sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },

        background: "darkblue",
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
