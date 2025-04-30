import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Typography,
  Paper,
  FormHelperText,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { selectedStreamState, authState } from "../../Recoil/RecoilState";
import axios from "axios";
import { baseURL, streamTypesArr } from "../../utils/StaticVariables";
import { useRecoilValue } from "recoil";
import LoadBtn from "../../Components/Reusable/LoadBtn";

export default function UpdateStreams({ loading = false, onBack }) {
  const selectedData = useRecoilValue(selectedStreamState);
  const { token } = useRecoilValue(authState);

  const validationSchema = yup.object({
    streams: yup.array().of(
      yup.object({
        id: yup.string().required(),
        name: yup.string().required("Name is required"),
        path: yup.string().required("Source path is required"),
        type: yup.string().required("Type is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      streams: selectedData,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log("Form values:", values.streams);
      try {
        await axios.put(`${baseURL}stream`, values.streams, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        resetForm();
        // Optionally show success notification
      } catch (error) {
        // Optionally show error notification
      }
    },
  });

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ mx: "auto", p: 3 }}
      noValidate
    >
      {formik.values.streams.length > 0 ? (
        formik.values.streams.map((stream, index) => (
          <Paper key={stream.id || index} elevation={1} sx={{ mb: 3, p: 3 }}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                name={`streams.${index}.name`}
                placeholder="Enter Stream Name"
                value={formik.values.streams[index]?.name || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.streams?.[index]?.name &&
                    formik.errors.streams?.[index]?.name
                )}
                helperText={
                  formik.touched.streams?.[index]?.name &&
                  formik.errors.streams?.[index]?.name
                }
              />

              <TextField
                fullWidth
                label="Source"
                name={`streams.${index}.path`}
                placeholder="Enter Stream Path"
                value={formik.values.streams[index]?.path || ""}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.streams?.[index]?.path &&
                    formik.errors.streams?.[index]?.path
                )}
                helperText={
                  formik.touched.streams?.[index]?.path &&
                  formik.errors.streams?.[index]?.path
                }
              />

              <FormControl
                fullWidth
                error={Boolean(
                  formik.touched.streams?.[index]?.type &&
                    formik.errors.streams?.[index]?.type
                )}
              >
                <InputLabel>Type</InputLabel>
                <Select
                  name={`streams.${index}.type`}
                  value={formik.values.streams[index]?.type || ""}
                  label="Type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {streamTypesArr.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.streams?.[index]?.type &&
                  formik.errors.streams?.[index]?.type && (
                    <FormHelperText>
                      {formik.errors.streams[index].type}
                    </FormHelperText>
                  )}
              </FormControl>
            </Stack>
          </Paper>
        ))
      ) : (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ py: 4 }}
        >
          No streams available to edit.
        </Typography>
      )}

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 4 }}
      >
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!formik.dirty}
          >
            Clear
          </Button>

          <LoadBtn loading={loading} />
        </Stack>
      </Stack>
    </Box>
  );
}
