import { useFormik } from "formik";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import AuthContentReusable from "../../Components/Auth/AuthContentReusable";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useSnack } from "../../hooks/useSnack";
import * as Yup from "yup";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
  const setAuthRecoil = useSetRecoilState(authState);
  const { showError  , showSuccess} = useSnack();



  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axios
        .post(baseURL + "login", values)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("expire", response.data.expires_at);
          setAuthRecoil({
            isAuthenticated: true,
            token: response.data.access_token,
            refreshToken: response.data.refresh_token,
            expire: response.data.expires_at,
          });
          window.location.reload();
          showSuccess("your login made successfully")
        })
        .catch((error) => {
          showError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <AuthContentReusable
      formik={formik}
      title="Login"
      btnText={"Send Massage"}
      des="login to your account  to access all features in INSIGHT EYE"
      contentRoute={{ linkText: " Forget your password ?", route: "/otp" }}
      loading={loading}
      footerRoute={{
        title: "  New user ?",
        linkText: " Contact us",
        route: "/contact",
      }}
    />
   
  );
};

export default LogIn;
