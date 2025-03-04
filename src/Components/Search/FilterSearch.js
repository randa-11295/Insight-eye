import React from "react";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePicker from "../Inputs/DateTimePicker"; // Import reusable component
import { Button } from "@mui/material";
import SelectCustom from "../Inputs/SelectCustom";

export default function FilterSearch() {
    // Formik setup with null defaults
    const formik = useFormik({
        initialValues: {
            startDate: null,
            startTime: null,
            endDate: null,
            endTime: null,
            limit: "25",
            id:null
        },
        onSubmit: (values) => {
            console.log("Submitted Values:", values);

            values.startDate = new Intl.DateTimeFormat("en-GB").format(values.startDate.$d);
            values.endDate = new Intl.DateTimeFormat("en-GB").format(values.endDate.$d);

            values.startTime = `${String(values.startTime.$H).padStart(2, "0")}:${String(values.startTime.$m).padStart(2, "0")}`;
            values.endTime = `${String(values.endTime.$H).padStart(2, "0")}:${String(values.endTime.$m).padStart(2, "0")}`;

            console.log("final Values:", values);
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form onSubmit={formik.handleSubmit}>
                {/* Start Date & Time */}
                <DateTimePicker
                    label="Start"
                    dateValue={formik.values.startDate}
                    timeValue={formik.values.startTime}
                    onDateChange={(date) => formik.setFieldValue("startDate", date)}
                    onTimeChange={(time) => formik.setFieldValue("startTime", time)}
                    maxDate={formik.values.endDate}
                />

                {/* End Date & Time */}
                <DateTimePicker
                    label="End"
                    dateValue={formik.values.endDate}
                    timeValue={formik.values.endTime}
                    onDateChange={(date) => formik.setFieldValue("endDate", date)}
                    onTimeChange={(time) => formik.setFieldValue("endTime", time)}
                    minDate={formik.values.startDate}
                />
                <SelectCustom label="Select Stream Name" arr={["camera_0","camera_1", "camera_2", ]} name={"id"} formik={formik} />
                <SelectCustom label="Select Frame Limit" arr={[10, 25, 50, 75, 100, 150, 200]} name={"limit"} formik={formik} />
                

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Submit
                </Button>
            </form>
        </LocalizationProvider>
    );
}
