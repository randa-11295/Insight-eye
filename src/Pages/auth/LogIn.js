import { useFormik } from "formik";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import AuthContentReusable from "../../Components/Auth/AuthContentReusable";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import * as Yup from "yup";
import { useSnackbar } from "notistack";

const LogIn = () => {
  
  const [loading, setLoading] = useState(false);
  const setAuthRecoil = useSetRecoilState(authState);
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      "user name / email": "",
      password: "",
    },
    validationSchema: Yup.object({
      "user name / email": Yup.string().required(
        "Username or Email is required"
      ),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      // Regular expression to validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const inputValue = values["user name / email"];

      // Dynamically choose either 'email' or 'username'
      const payload = {
        password: values.password,
        ...(emailRegex.test(inputValue)
          ? { email: inputValue }
          : { username: inputValue }),
      };

      axios
        .post(baseURL + "login", payload)
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
        })
        .catch((error) => {
          enqueueSnackbar(error?.message || "some thing want wrong", {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <AuthContentReusable
      formik={formik}
      title="LOGIN"
      btnText={"Login"}
      des="Login to your account to access all features in INSIGHTEYE"
      contentRoute={{ linkText: "Forget your password?", route: "/otp" }}
      loading={loading}
      footerRoute={{
        title: "New user?",
        linkText: "Contact us",
        route: "/contact",
      }}
    />
  );
};

export default LogIn;
