import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { snackAlertState } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";
import { useState } from "react";
import AuthContentReusable from "../../Components/Auth/AuthContentReusable";
import axios from "axios";
const Contact = () => {
  const setSnackAlert = useSetRecoilState(snackAlertState);
  const [loading, setLoading] = useState(false);

  const showSuccess = () => {
    setSnackAlert({
      open: true,
      message: "Your Massage send Successful!",
      severity: "success",
    });
  };

  const showError = () => {
    setSnackAlert({
      open: true,
      message: "Something went wrong!",
      severity: "error",
    });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().min(2, "Too short").required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      message: Yup.string()
        .min(10, "Message too short")
        .required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);

      setLoading(true);

      axios
        .post(baseURL + "contact", {
          ...values,
        })
        .then(() => {
          formik.handleReset();
          showSuccess();
          resetForm();
        })
        .catch((error) => {
          showError();
          // showSuccess()
        })
        .finally(() => setLoading(false));
    },
  });

  return (
    <AuthContentReusable
      formik={formik}
      title="Contact Us"
      des="Get in touch with us for questions, feedback, or support — we’re here to help!"
      loading={loading}
      btnText={"Send Massage"}
      contentRoute={{ linkText: " Forget your password ?", route: "/otp" }}
      footerRoute={{
        title: "Every thing is okay ?",
        linkText: "Back to login",
        route: "/login",
      }}
    />
  );
};

export default Contact;
