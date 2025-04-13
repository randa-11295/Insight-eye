import { useFormik } from "formik";
import { useState } from "react";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { useAxiosWithAuth } from "../../services/api";
import AuthContentReusable from "./AuthContentReusable";

const LogIn = () => {
  const [loading, setLoading] = useState(false);
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

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);

      api
        .post("login", values)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("refresh_token", response.data.refresh_token);
          localStorage.setItem("expire", response.data.expires_at);
          // setAuthRecoil({
          //   isAuthenticated: true,
          //   token: response.data.access_token,
          //   refreshToken: response.data.refresh_token,
          //   expire: response.data.expires_at,
          // });
          window.location.reload();
        })
        .catch((error) => {
          console.log("his error", error);
          showError();
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
      des="login to your account  to access all features in INSIGHT EYE"
      contentRoute={{ linkText: " Forget your password ?", route: "/" }}
      loading={loading}
      footerRoute={{
        title: "  New user ?",
        linkText: " Contact us",
        route: "/",
      }}
    />
   
  );
};

export default LogIn;
