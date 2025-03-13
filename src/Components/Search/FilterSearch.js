import React, { forwardRef, useImperativeHandle } from "react";
import { useFormik } from "formik";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePicker from "../Inputs/DateTimePicker";
import { Stack } from "@mui/system";
import SelectCustom from "../Inputs/SelectCustom";
import { filterResultState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const FilterSearch = forwardRef((props, ref) => {

    const [formState, setFormState] = useRecoilState(filterResultState);

    const formik = useFormik({
        initialValues: formState, // Load saved values
        onSubmit: (values) => {
            const formattedValues = {
                ...values,
                startDate: values.startDate ? new Intl.DateTimeFormat("en-GB").format(values.startDate.$d) : null,
                endDate: values.endDate ? new Intl.DateTimeFormat("en-GB").format(values.endDate.$d) : null,
                startTime: values.startTime ? `${String(values.startTime.$H).padStart(2, "0")}:${String(values.startTime.$m).padStart(2, "0")}` : null,
                endTime: values.endTime ? `${String(values.endTime.$H).padStart(2, "0")}:${String(values.endTime.$m).padStart(2, "0")}` : null,
            };

            setFormState(values); 
            props.changeFilterHandle(formattedValues);
        },
    });

    useImperativeHandle(ref, () => ({
        submit: formik.handleSubmit,
    }));

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack gap={2} component="form" onSubmit={formik.handleSubmit}>
                <DateTimePicker label="Start" dateValue={formik.values.startDate} timeValue={formik.values.startTime}
                    onDateChange={(date) => formik.setFieldValue("startDate", date)}
                    onTimeChange={(time) => formik.setFieldValue("startTime", time)} maxDate={formik.values.endDate} />

                <DateTimePicker label="End" dateValue={formik.values.endDate} timeValue={formik.values.endTime}
                    onDateChange={(date) => formik.setFieldValue("endDate", date)}
                    onTimeChange={(time) => formik.setFieldValue("endTime", time)} minDate={formik.values.startDate} />

                <SelectCustom label="Select Stream Name" arr={["camera_0", "camera_1", "camera_2"]} name={"id"} formik={formik} />
                <SelectCustom label="Select Frame Limit" arr={[10, 25, 50, 75, 100, 150, 200, props.total]} name={"limit"} formik={formik} />
            </Stack>
        </LocalizationProvider>
    );
});

export default FilterSearch;
