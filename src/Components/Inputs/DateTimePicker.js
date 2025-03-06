import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack, Typography } from "@mui/material";

export default function DateTimePicker({
    label,
    dateValue,
    timeValue,
    onDateChange,
    onTimeChange,
    minDate,
    maxDate,
}) {
    return (<div>
        <Typography variant="h6" sx={{ fontSize: ".9rem", fontWeight: 600, textTransform: "capitalize" , mb: 1}}  >
            {label} Date & Time :
        </Typography>
        <Stack sx={{ flexDirection: { md: "row" } }} gap={2}     >
            <DatePicker
                value={dateValue}
                onChange={(date) => onDateChange(date, label)}
                minDate={minDate}
                maxDate={maxDate}
                sx={{ width: "100%" }}
            />
            <TimePicker
                value={timeValue}
                onChange={(time) => onTimeChange(time, label)}
                disabled={!dateValue} // Enable only when date is selected
                sx={{ width: "100%" }}
            />
        </Stack>
    </div>

    );
}
