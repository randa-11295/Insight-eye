import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Box, Button, Stack, CardContent, Typography } from "@mui/material";
import { baseURL } from "../utils/StaticVariables";
import { authState } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import Info from "../Components/Auth/Info";
import InputTextCustom from "../Components/Inputs/InputTextCustom";

const Login = () => {
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
        p: 4
      }}
    >
     <Info />
      <Box sx={{
        width: { md: "50%" },
        height: { xs: "50%", md: "100%" },
      }} >

        <CardContent component="form" onSubmit={formik.handleSubmit}>
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: "3rem",
                fontWeight: "bold",
                color: "primary.main"
              }}
            >
              LOGIN
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mt: 1,
              }}
            >
              login to your account  to access all features in INSIGHT EYE</Typography>
          </Box>

          <InputTextCustom label="Email "
            placeholder="Enter your email or user name"
            formik={formik}
            name="username" />

          <InputTextCustom label="password"
            placeholder="Enter your password"
            type="password"
            formik={formik}
            name="Password"

            value={formik.values.username}
            onChange={formik.handleChange} />

          <Button fullWidth variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
            Login
          </Button>

        </CardContent>
      </Box>
    </Stack>
  );
};

export default Login;
