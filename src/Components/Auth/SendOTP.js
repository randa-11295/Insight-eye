import { useFormik } from "formik";
import { useState } from "react";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import AuthContentReusable from "../../Components/Auth/AuthContentReusable";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import * as Yup from "yup";

const SendOTP = (props) => {
  const [loading, setLoading] = useState(false);
  const setSnackAlert = useSetRecoilState(snackAlertState);

  const showError = () => {
    setSnackAlert({
      open: true,
      message: "some thing wrong",
      severity: "error",
    });
  };

  const showSuccess = () => {
    setSnackAlert({
      open: true,
      message: "OtP Send Successfully ",
      severity: "error",
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);

      axios
        .post(baseURL + "otp/send-otp", { email: values.email, length: 6 })
        .then((response) => {
          console.log(response.data.message);
          props.setOtpSent("verify");
          showSuccess();
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
      title="OTP"
      btnText={"Send OTP Code"}
      des="OTP to your account  to access all features in INSIGHT EYE"
      // contentRoute={{ linkText: " Forget your password ?", route: "/" }}
      loading={loading}
      footerRoute={{
        title: "  New user ?",
        linkText: "Contact us",
        route: "/contact",
      }}
    />
  );
};

export default SendOTP;
