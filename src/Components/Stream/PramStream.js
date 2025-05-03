import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Stack } from "@mui/material";
import InputTextCustom from "../Inputs/InputTextCustom";
import LoadBtn from "../Reusable/LoadBtn";
import { useRecoilValue } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { baseURL } from "../../utils/StaticVariables";
import { useSnackbar } from "notistack";

const ParamStream = () => {
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();

  // Formik setup
  const formik = useFormik({
    initialValues: { frame_skip: 0, conf: 0.1 },
    validationSchema: Yup.object({
      frame_skip: Yup.number()
        .min(300, "Minimum 300")
        .required("Frame Skip is required"),
      conf: Yup.number()
        .min(0.1, "Minimum 0.1")
        .max(1, "Maximum 1")
        .required("Confidence is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.put(
          `${baseURL}param_stream/user`,
          values,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        enqueueSnackbar("Stream configuration updated successfully", {
          variant: "success",
        });
      } catch (error) {
        enqueueSnackbar(
          error?.response?.data?.message || error.message || "Update failed",
          { variant: "error" }
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch existing parameters
  const fetchParams = useCallback(async () => {
    if (!token) return;
    formik.setSubmitting(true);

    try {
      const { data } = await axios.get(
        `${baseURL}param_stream/user`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      formik.setValues({
        frame_skip: data.frame_skip ?? formik.initialValues.frame_skip,
        conf: data.conf ?? formik.initialValues.conf,
      });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.message || error.message || "Failed to fetch config",
        { variant: "error" }
      );
    } finally {
      formik.setSubmitting(false);
    }
  }, [token]);

  useEffect(() => {
    fetchParams();
  }, [fetchParams]);

  return (
    <Stack
      component="form"
      direction="row"
      spacing={2}
      alignItems="center"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <InputTextCustom
        label="Frame Skip"
        name="frame_skip"
        formik={formik}
        small={true}
        disabled={formik.isSubmitting}
      />

      <InputTextCustom
       small={true}
        label="Confidence"
        name="conf"
        formik={formik}
        disabled={formik.isSubmitting}
      />

      <LoadBtn loading={formik.isSubmitting} text="Save" />
    </Stack>
  );
};

export default ParamStream;
