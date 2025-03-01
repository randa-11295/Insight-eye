import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack } from "@mui/material";

export default function DateTimePicker({
     label,
     dateValue,
     timeValue,
     onDateChange,
     onTimeChange,
     minDate,
     maxDate,
}) {
     return (
          <Stack sx={{ flexDirection: { md: "row" } }} gap={2} my={3}>
               <DatePicker
                    label={label}
                    value={dateValue}
                    onChange={onDateChange}
                    minDate={minDate}
                    maxDate={maxDate}
                    sx={{width : "100%"}}
               />
               <TimePicker
                    label={`${label} Time`}
                    value={timeValue}
                    onChange={onTimeChange}
                    disabled={!dateValue} // Enable time picker only if a date is selected
                    sx={{width : "100%"}}
               />
          </Stack>
     );
}
