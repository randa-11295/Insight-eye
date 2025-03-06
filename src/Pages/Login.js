import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";
import { baseURL } from "../utils/StaticVariables";
import { authState } from "../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const Login = () => {
  const [, setAuthRecoil] = useRecoilState(authState);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values)

      try {
        const response = await axios.post(baseURL + "/login", values);
        console.log("Login Successful:", response.data);

        setAuthRecoil({
          isAuthenticated: true,
          username: response.data.username,
          token: response.data.session_id,
        })

      } catch (error) {
        console.error("Login Failed:", error);
      }
    },
  });

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85vh" }}>
      <Card style={{ width: 400, padding: 20 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
