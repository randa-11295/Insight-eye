import { useState } from "react";
import SendOTP from "../../Components/Auth/otp/SendOTP";
import VerifyOTP from "../../Components/Auth/otp/VerifyOTP";
import { useFormik } from "formik";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import ResetPassword from "../../Components/Auth/ResetPassword";

const OTP = () => {
  const [otpSent, setOtpSent] = useState("otp");
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const sendOTPFormik = useFormik({
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
          setOtpSent("send");
          enqueueSnackbar("Your OTP sended Successful", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
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
          expiration: "1000",
        })
        .then((response) => {
          setOtpSent("verify");
          enqueueSnackbar("your Otp is valid", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.message, {
            variant: "error",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <>
      {otpSent === "otp" && (
        <SendOTP formik={sendOTPFormik} loading={loading} />
      )}
      {otpSent === "send" && (
        <VerifyOTP
          loading={loading}
          formik={verifyOTPFormik}
          setOtpSent={setOtpSent}
        />
      )}
      {otpSent === "verify" && (
        <ResetPassword email={sendOTPFormik.values.email} />
      )}
    </>
  );
};

export default OTP;
