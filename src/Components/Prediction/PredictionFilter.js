// PredictionFilter.jsx
import React, { forwardRef, useImperativeHandle } from "react";
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
import { streamState } from "../../Recoil/RecoilState";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

// Helper: turn incoming filter strings into Dayjs (or null)
const makeInitial = (filter) => ({
  camera_id: filter.camera_id ?? "",
  startDate: filter.startDate
    ? dayjs(filter.startDate, "DD/MM/YYYY")
    : null,
  endDate: filter.endDate
    ? dayjs(filter.endDate, "DD/MM/YYYY")
    : null,
  startTime: filter.startTime
    ? dayjs(filter.startTime, "HH:mm")
    : null,
  endTime: filter.endTime
    ? dayjs(filter.endTime, "HH:mm")
    : null,
});

const PredictionFilter = forwardRef((props, ref) => {
  const { changeFilterHandle } = props;
  const { data: cameraOptions, loading, error } = useRecoilValue(streamState);

  const formik = useFormik({
    initialValues: makeInitial(props.filter),
    enableReinitialize: true,
    onSubmit: (values) => {
      changeFilterHandle({
        camera_id: values.camera_id,
        startDate: values.startDate?.format("DD/MM/YYYY") ?? null,
        endDate: values.endDate?.format("DD/MM/YYYY") ?? null,
        startTime: values.startTime?.format("HH:mm") ?? null,
        endTime: values.endTime?.format("HH:mm") ?? null,
      });
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
          onDateChange={(d) => formik.setFieldValue("startDate", d)}
          onTimeChange={(t) => formik.setFieldValue("startTime", t)}
          maxDate={formik.values.endDate}
        />

        {/* 📅 End Date & Time */}
        <DateTimePicker
          label="End"
          dateValue={formik.values.endDate}
          timeValue={formik.values.endTime}
          onDateChange={(d) => formik.setFieldValue("endDate", d)}
          onTimeChange={(t) => formik.setFieldValue("endTime", t)}
          minDate={formik.values.startDate}
        />
      </Stack>
    </LocalizationProvider>
  );
});

export default PredictionFilter;
