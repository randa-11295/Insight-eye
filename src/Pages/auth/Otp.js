import { useState } from "react";
import SendOTP from "../../Components/Auth/otp/SendOTP";
import VerifyOTP from "../../Components/Auth/otp/VerifyOTP";
import { useFormik } from "formik";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import * as Yup from "yup";

const OTP = () => {
  const [otpSent, setOtpSent] = useState(false);
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

  const sendOTPFormik = useFormik({
    initialValues: {
      email: "randa.mohamed1295@gmail.com",
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
          setOtpSent("verify");
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

  const verifyOTPFormik = useFormik({
    initialValues: {
      OTP: "",
    },

    onSubmit: (values) => {
      setLoading(true);
      axios
        .post(baseURL + "otp/verify-otp", {
          email: sendOTPFormik.values.email,
          otp: values.OTP,
          expiration: "20000",
        })
        .then((response) => {
          console.log("done" ,response.data.message);
          setOtpSent("verify");
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
    <>
      {!otpSent && <SendOTP formik={sendOTPFormik} loading={loading} />}
      {otpSent === "verify" && (
        <VerifyOTP
          loading={loading}
          formik={verifyOTPFormik}
          setOtpSent={setOtpSent}
        />
      )}
    </>
  );
};

export default OTP;
