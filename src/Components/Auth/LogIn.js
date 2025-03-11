import { baseURL } from "../../utils/StaticVariables";
import InputTextCustom from "../Inputs/InputTextCustom";
import LoadBtn from "../Reusable/LoadBtn";
import { useFormik } from "formik";
import axios from "axios";
import { useRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { Box, Button, Typography } from "@mui/material";

const LogIn = () => {

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

    <Box>
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
          name="Password"

          value={formik.values.username}
          onChange={formik.handleChange} />
        <Button sx={{ margin: "auto" }}>

          Forget your password?
        </Button>
        <LoadBtn fullWidth text={"LogIn"} />

      </Box>
      </Box>
  )
}

export default LogIn