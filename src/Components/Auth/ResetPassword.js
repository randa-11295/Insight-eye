import { useFormik } from "formik";
import { useState } from "react";
import AuthContentReusable from "./AuthContentReusable";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const ResetPassword = ({ email }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    new_password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    conform_password: Yup.string()
      .oneOf([Yup.ref("new_password")], "Passwords must match")
      .required("Confirm your password"),
  });

  const formik = useFormik({
    initialValues: {
      new_password: "",
      conform_password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setLoading(true);

      const payload = {
        email: email,
        new_password: values.new_password,
      };

      axios
        .put(baseURL + "users/reset_password", payload)
        .then(() => {
          enqueueSnackbar("You reset your password successfully", {
            variant: "success",
          });
          navigate("/login");
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
    <AuthContentReusable
      formik={formik}
      title="Reset Password"
      btnText="Reset"
      des="Reset your password to access all features in INSIGHT EYE"
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
