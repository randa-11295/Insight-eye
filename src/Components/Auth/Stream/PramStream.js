import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputTextCustom from "../../Inputs/InputTextCustom";
import { Button, CircularProgress } from "@mui/material";
import { useSnack } from "../../../hooks/useSnack";

const PramStream = () => {
  const [loading, setLoading] = useState(false);
  const { showError, showSuccess } = useSnack();
  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: { frame_delay: 0, frame_skip: 0, conf: 0.1 },
    validationSchema: Yup.object({
      frame_delay: Yup.number().min(0).max(10),
      frame_skip: Yup.number().min(0).max(10),
      conf: Yup.number().min(0.1).max(1),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.put("/param_stream/user", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        showSuccess("You updated your stream config successfully");
      } catch (error) {
        showError(error.message || "Update failed.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    axios
      .get("/param_stream/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        formik.setValues({
          frame_delay: data.frame_delay ?? 0,
          frame_skip: data.frame_skip ?? 0,
          conf: data.conf ?? 0.1,
        });
        showSuccess("Fetched your stream config successfully");
      })
      .catch((error) => showError(error.message));
  }, [token]); // include token in dependencies

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      {["frame_delay", "frame_skip", "conf"].map((field) => (
        <InputTextCustom
          key={field}
          label={field}
          name={field}
          formik={formik}
        />
      ))}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Update Params"}
      </Button>
    </form>
  );
};

export default PramStream;
