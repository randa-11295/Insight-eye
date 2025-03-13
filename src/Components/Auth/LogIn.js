import { baseURL } from "../../utils/StaticVariables";
import InputTextCustom from "../Inputs/InputTextCustom";
import LoadBtn from "../Reusable/LoadBtn";
import { useFormik } from "formik";
import axios from "axios";
import { Box, Link, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";

const LogIn = () => {
  const [loading, setLoading] = useState(false)
  const setAuthRecoil = useSetRecoilState(authState);
  const setSnackAlert = useSetRecoilState(snackAlertState);

  const showError = () => {
    setSnackAlert({
      open: true,
      message: "Email or Password is wrong",
      severity: "error",
    });
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true)
      axios.post(baseURL + "/login", values)
        .then(response => {
          
          localStorage.setItem("token", response.data.session_id);
          localStorage.setItem("username", response.data.username);
          setAuthRecoil({
            isAuthenticated: true,
            username: response.data.username,
            token: response.data.session_id,
          });
        })
        .catch(() => {
          showError();
        })
        .finally(() => {
          console.log("Login request completed.");
          setLoading(false)
        });
    },
  });


  return (

    <Stack justifyContent="space-around" gap={4} sx={{ height: "100%" }}>
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

      <Box component="form" onSubmit={formik.handleSubmit}>

        <InputTextCustom label="Email "
          placeholder="Enter your email or user name"
          formik={formik}
          name="username" />

        <InputTextCustom label="password"
          placeholder="Enter your password"
          type="password"
          formik={formik}
          name="password"

          value={formik.values.username}
          onChange={formik.handleChange} />

        <LoadBtn fullWidth text={"LogIn"} handle={() => formik.handleSubmit()} loading={loading} />

        <Link component="span" underline="hover" sx={{ cursor: "pointer", padding: "20px", display: "block", textAlign: "center" }}>
          Forget your password ?
        </Link>
      </Box>

      <Typography sx={{ textAlign: "center" }}>

        New user ?
        <Link component="span" underline="hover" sx={{ cursor: "pointer", padding: "10px" }}>
          Contact us
        </Link>
      </Typography>
    </Stack>
  )
}

export default LogIn