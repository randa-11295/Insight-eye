import InputTextCustom from "../Inputs/InputTextCustom";
import LoadBtn from "../Reusable/LoadBtn";
import { Box, Link, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import {useAxiosWithAuth} from "../../services/api"
import axios from "axios"
import {baseURL} from "../../utils/StaticVariables" 

const AuthContentReusable = ({title , des , formik , children , contentRoute , footerRoute }) => {
  const [loading, setLoading] = useState(false)
  const setAuthRecoil = useSetRecoilState(authState);
  const setSnackAlert = useSetRecoilState(snackAlertState);
  const api = useAxiosWithAuth();

  const showError = () => {
    setSnackAlert({
      open: true,
      message: "Email or Password is wrong",
      severity: "error",
    });
  };



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
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mt: 1,
          }}
        >
          {des}</Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit}>

        {/* <InputTextCustom label="Username "
          placeholder="Enter your user name"
          formik={formik}
          name="username" />

        <InputTextCustom label="password"
          placeholder="Enter your password"
          type="password"
          formik={formik}
          name="password"

          value={formik.values.username}
          onChange={formik.handleChange} /> */}

          {children}

        <LoadBtn submit fullWidth text={"Send"} handle={() => formik.handleSubmit()} loading={loading} />

        <Link component="span" underline="hover" sx={{ cursor: "pointer", padding: "20px", display: "block", textAlign: "center" }}>
         {contentRoute.linkText}
        </Link>
      </Box>

      <Typography sx={{ textAlign: "center" }}>

       {footerRoute.title}
        <Link component="span" underline="hover" sx={{ cursor: "pointer", padding: "10px" }}>
        {footerRoute.linkText}
        </Link>
      </Typography>
    </Stack>
  )
}

export default AuthContentReusable