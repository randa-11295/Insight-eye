// import React, { forwardRef, useImperativeHandle } from "react";
// import { useformik } from "formik?";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import DateTimePicker from "../Inputs/DateTimePicker";
// import { Stack } from "@mui/system";
// import SelectCustom from "../Inputs/SelectCustom";
// import { useRecoilState } from "recoil";

// const PredFilter= forwardRef((props, ref) => {

//     const [formState, setFormState] = useRecoilState({});

//     const formik = useformik({
//         initialValues: formState, // Load saved values
//         onSubmit: (values) => {
//             const formattedValues = {
//                 ...values,
//                 startDate: values.startDate ? new Intl.DateTimeFormat("en-GB").format(values.startDate.$d) : null,
//                 endDate: values.endDate ? new Intl.DateTimeFormat("en-GB").format(values.endDate.$d) : null,
//                 startTime: values.startTime ? `${String(values.startTime.$H).padStart(2, "0")}:${String(values.startTime.$m).padStart(2, "0")}` : null,
//                 endTime: values.endTime ? `${String(values.endTime.$H).padStart(2, "0")}:${String(values.endTime.$m).padStart(2, "0")}` : null,
//             };

//             setFormState(values); 
//             props.changeFilterHandle(formattedValues);
//         },
//     });

//     useImperativeHandle(ref, () => ({
//         submit: formik?.handleSubmit,
//     }));

//     return (
//      <>
//      {/* //    <LocalizationProvider dateAdapter={AdapterDayjs}>
//      //        <Stack gap={2} component="form" onSubmit={formik?.handleSubmit}>
//      //            <DateTimePicker label="Start" dateValue={formik?.values.startDate} timeValue={formik?.values.startTime}
//      //                onDateChange={(date) => formik?.setFieldValue("startDate", date)}
//      //                onTimeChange={(time) => formik?.setFieldValue("startTime", time)} maxDate={formik?.values.endDate} />

//      //            <DateTimePicker label="End" dateValue={formik?.values.endDate} timeValue={formik?.values.endTime}
//      //                onDateChange={(date) => formik?.setFieldValue("endDate", date)}
//      //                onTimeChange={(time) => formik?.setFieldValue("endTime", time)} minDate={formik?.values.startDate} />

//      //        </Stack>
//      //    </LocalizationProvider> */}

//      tesst
//      </>
//     );
// });

// export default FilterSearch;



import { useFormik } from 'formik';
import axios from 'axios';
import React from 'react';

const CAMERA_OPTIONS = ['cam1', 'cam2', 'cam3', 'cam4'];

const QueryForm = () => {
  const formik = useFormik({
    initialValues: {
      camera_id: '',      // will hold comma-separated string like "cam1,cam3"
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
    },
    onSubmit: async (values) => {
    console.log(values)
    },
  });

  const handleCameraCheckboxChange = (camera) => {
    const selected = formik.values.camera_id
      ? formik.values.camera_id.split(',').filter(Boolean)
      : [];

    const updated = selected.includes(camera)
      ? selected.filter((c) => c !== camera)
      : [...selected, camera];

    formik.setFieldValue('camera_id', updated.join(','));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* 🔲 Camera Section */}
      <div>
        <label><strong>Camera ID</strong></label>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
          {CAMERA_OPTIONS.map((cam) => (
            <label key={cam}>
              <input
                type="checkbox"
                checked={formik.values.camera_id.includes(cam)}
                onChange={() => handleCameraCheckboxChange(cam)}
              />
              {cam}
            </label>
          ))}
        </div>
      </div>

      {/* 🗓️ Other Fields */}
      {['start_date', 'end_date', 'start_time', 'end_time'].map((field) => (
        <div key={field} style={{ marginBottom: '12px' }}>
          <label htmlFor={field}>{field.replace('_', ' ')}:</label>
          <input
            id={field}
            name={field}
            type="text"
            value={formik.values[field]}
            onChange={formik.handleChange}
            placeholder={field}
          />
        </div>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default QueryForm;
