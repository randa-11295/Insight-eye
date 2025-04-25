import { useFormik } from "formik";
import { useState } from "react";
import AuthContentReusable from "./AuthContentReusable";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useSnack } from "../../hooks/useSnack";
import * as Yup from "yup";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useSnack();

 
// ✅ Validation schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New password is required"),
  conform_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Passwords must match")
    .required("Confirm your password"),
});

const formik = useFormik({
  initialValues: {
    email: "",
    new_password: "",
    conform_password: "",
  },
  validationSchema, // ✅ Apply validation
  onSubmit: (values) => {
    setLoading(true);

    // ✅ Only send necessary fields to API
    const payload = {
      email: values.email,
      new_password: values.new_password,
    };

    axios
      .put(baseURL + "users/reset_password", payload)
      .then((response) => {
        console.log(response);
        showSuccess("You reset your password successfully");
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
      title="Reset Password"
      btnText="Reset"
      des="Log in to your account to regain full access to all features in INSIGHT EYE."
      contentRoute={{ linkText: "Back to log in", route: "/login" }}
      loading={loading}
      footerRoute={{
        title: "  New user ?",
        linkText: " Contact us",
        route: "/contact",
      }}
    />
  );
};

export default ResetPassword;
