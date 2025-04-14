import React from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSetRecoilState } from "recoil";
import { snackAlertState } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";
import { useState } from "react";

import axios from "axios";
const Contact = () => {
  const setSnackAlert = useSetRecoilState(snackAlertState);
  const [loading, setLoading] = useState(false)
    
  const showSuccess = () => {
    setSnackAlert({
      open: true,
      message: "Operation successful!",
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
      message: Yup.string().min(10, "Message too short").required("Message is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Data:", values);
     
      setLoading(true);

      axios.post(baseURL + "contact", {
        ...values,
      })
        .then(() => {
          formik.handleReset()
          showSuccess()
          resetForm();
        })
        .catch(error => {

          showError()
          // showSuccess()
        })
        .finally(() => setLoading(false))

    },
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Contact Us
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            margin="normal"
          />
          <TextField
            fullWidth
            id="message"
            name="message"
            label="Message"
            multiline
            rows={4}
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={formik.touched.message && formik.errors.message}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
