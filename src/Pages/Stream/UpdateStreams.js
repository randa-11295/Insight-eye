import React from 'react';
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
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { selectedStreamState } from "../../Recoil/RecoilState"
import { useRecoilState } from "recoil";




const validationSchema = yup.object({
  streams: yup.array().of(
    yup.object({
      id: yup.string().required(),
      name: yup.string().required('Name is required'),
      path: yup.string().required('Source path is required'),
      type: yup.string().required('Type is required')
    })
  )
});

export default function UpdateStreams({
  loading = false,
  onSubmit,
  onBack
}) {

  const [selectedData] = useRecoilState(selectedStreamState);

  const formik = useFormik({
    initialValues: {
      streams: selectedData
    },
    // validationSchema,
    // enableReinitialize: true,
    onSubmit: (values) => {
      console.log("original",selectedData);
      console.log("update",values.streams);
    },
  });

 

  const handleReset = () => {
    formik.resetForm();
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ maxWidth: '800px', mx: 'auto', p: 3 }}>
      {formik.values.streams.length > 0 ? (
        formik.values.streams.map((stream, index) => (
          <Paper
            key={stream.id}
            elevation={1}
            sx={{ mb: 3, p: 3 }}
          >
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Name"
                name={`streams.${index}.name`}
                placeholder="Enter Stream Name"
                value={stream.name}
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
                value={stream.path}
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
                  value={stream.type}
                  label="Type"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {["test", "hi", "here"].map((option) => (
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
        <Button
          variant="outlined"
          onClick={onBack}

        >
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

          <Button
            variant="contained"
            type="submit"
            disabled={loading || !formik.dirty || !formik.isValid}

          >
            Save Changes
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}