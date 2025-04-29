import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputTextCustom from "../Inputs/InputTextCustom";
import { Stack } from "@mui/material";
import LoadBtn from "../Reusable/LoadBtn";
import { useRecoilValue } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";
import { useSnackbar } from "notistack";
const ParamStream = () => {
  const { token } = useRecoilValue(authState);

  const [loading, setLoading] = useState(false);
const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      frame_skip: 0,
      conf: 0.1,
    },
    validationSchema: Yup.object({
      frame_delay: Yup.number()
        .min(0, "Minimum 0")
        .max(10, "Maximum 10")
        .required("Frame Delay is required"),
      frame_skip: Yup.number()
        .min(0, "Minimum 0")
        .max(10, "Maximum 10")
        .required("Frame Skip is required"),
      conf: Yup.number()
        .min(0.1, "Minimum 0.1")
        .max(1, "Maximum 1")
        .required("Confidence is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.put(baseURL + "param_stream/users", values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        enqueueSnackbar("Stream configuration updated successfully", {
          variant: "success",
        }) 
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || error.message || "Update failed",
          { variant: "error" }
        );
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (!token) return;

    const fetchParams = async () => {
      try {
        const { data } = await axios.get(baseURL + "param_stream/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        formik.setValues({
          frame_skip: data.frame_skip ?? 0,
          conf: data.conf ?? 0.1,
        });
      } catch (error) {
    
        enqueueSnackbar( error?.response?.data?.message ||
          error.message ||
          "Failed to fetch config"
      , {
          variant: "error",
        }) 
      }
    };

    if (token) {
      fetchParams();
    };
  }, [token, formik, enqueueSnackbar]);

  return (
    <Stack
      component="form"
      direction={{ md: "row" }}
      alignItems={{ md: "center" }}
      gap={2}
      onSubmit={formik.handleSubmit}
      noValidate
    >
      {[ "frame_skip", "conf"].map((field) => (
        <InputTextCustom
          key={field}
          label={field.replace("_", " ")}
          name={field}
          formik={formik}
          small={true}
        />
      ))}

      <LoadBtn loading={loading} text="Send"  />
    </Stack>
  );
};

export default ParamStream;
