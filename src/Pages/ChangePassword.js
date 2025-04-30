import  { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, Button, Stack, CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import InputTextCustom from "../Components/Inputs/InputTextCustom"; // Adjust path as needed
import { baseURL } from "../utils/StaticVariables"; // Your API base URL
import LoadBtn from "../Components/Reusable/LoadBtn";
const ChangePassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: "",
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      current_password: Yup.string().required("Current password is required"),
      new_password: Yup.string()
        .required("New password is required")
        .min(8, "Must be at least 8 characters"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("new_password")], "Passwords must match")
        .required("Please confirm your new password"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.put(`${baseURL}update-password`, values);
        enqueueSnackbar(
          response.data.message || "Password updated successfully",
          {
            variant: "success",
          }
        );
        formik.resetForm();
      } catch (error) {
        enqueueSnackbar(
          error.response?.data?.detail || "Error updating password",
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    },
  });

  return (
 
      <Card 
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ width: "100%"  , padding : 2, mt: 6 }}
      >
        <Stack spacing={1}>
          <InputTextCustom label="Username" name="username" formik={formik} />
          <InputTextCustom
            label="Current Password"
            name="current_password"
            type="password"
            formik={formik}
          />
          <InputTextCustom
            label="New Password"
            name="new_password"
            type="password"
            formik={formik}
          />
          <InputTextCustom
            label="Confirm Password"
            name="confirm_password"
            type="password"
            formik={formik}
          />
          <LoadBtn loading={loading}/>
      
        </Stack>
      </Card>
  );
};

export default ChangePassword;
