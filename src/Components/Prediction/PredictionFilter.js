import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePicker from "../Inputs/DateTimePicker";
import {
  Stack,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRecoilValue } from "recoil";
import { streamState } from "../../Recoil/RecoilState"; // ✅ Make sure the path is correct

const PredictionFilter = forwardRef((props, ref) => {
  const { changeFilterHandle } = props;
  const { data: cameraOptions, loading, error } = useRecoilValue(streamState); // ✅ use streamState

  const formik = useFormik({
    initialValues: props.filter,
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        startDate: values.startDate
          ? new Intl.DateTimeFormat("en-GB").format(values.startDate.$d)
          : null,
        endDate: values.endDate
          ? new Intl.DateTimeFormat("en-GB").format(values.endDate.$d)
          : null,
        startTime: values.startTime
          ? `${String(values.startTime.$H).padStart(2, "0")}:${String(
              values.startTime.$m
            ).padStart(2, "0")}`
          : null,
        endTime: values.endTime
          ? `${String(values.endTime.$H).padStart(2, "0")}:${String(
              values.endTime.$m
            ).padStart(2, "0")}`
          : null,
      };

      console.log("Submitted Filter:", formattedValues);
      changeFilterHandle(formattedValues);
    },
  });

  useImperativeHandle(ref, () => ({
    submit: formik.handleSubmit,
  }));

  const handleCameraCheckboxChange = (cameraId) => {
    const selected = formik.values.camera_id
      ? formik.values.camera_id.split(",").filter(Boolean)
      : [];

    const updated = selected.includes(cameraId)
      ? selected.filter((id) => id !== cameraId)
      : [...selected, cameraId];

    formik.setFieldValue("camera_id", updated.join(","));
  };

  const selectedIds = formik.values.camera_id
    ? formik.values.camera_id.split(",").filter(Boolean)
    : [];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack gap={3} component="form" onSubmit={formik.handleSubmit}>
        {/* 🔲 Stream Checkbox Selector */}
        <Box>
          <Typography fontWeight={600} mb={1}>
            Select Cameras:
          </Typography>

          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress size={24} />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && cameraOptions?.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {cameraOptions.map((cam) => (
                <Box
                  key={cam.id}
                  sx={{ width: "50%", boxSizing: "border-box", px: 1, py: 0.5 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedIds.includes(cam.id)}
                        onChange={() => handleCameraCheckboxChange(cam.id)}
                      />
                    }
                    label={cam.name}
                  />
                </Box>
              ))}
            </Box>
          )}

          {!loading && !error && cameraOptions?.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              No cameras available.
            </Typography>
          )}
        </Box>

        {/* 📅 Start Date & Time */}
        <DateTimePicker
          label="Start"
          dateValue={formik.values.startDate}
          timeValue={formik.values.startTime}
          onDateChange={(date) => formik.setFieldValue("startDate", date)}
          onTimeChange={(time) => formik.setFieldValue("startTime", time)}
          maxDate={formik.values.endDate}
        />

        {/* 📅 End Date & Time */}
        <DateTimePicker
          label="End"
          dateValue={formik.values.endDate}
          timeValue={formik.values.endTime}
          onDateChange={(date) => formik.setFieldValue("endDate", date)}
          onTimeChange={(time) => formik.setFieldValue("endTime", time)}
          minDate={formik.values.startDate}
        />
      </Stack>
    </LocalizationProvider>
  );
});

export default PredictionFilter;
