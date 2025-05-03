// DateTimePicker.jsx
import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function toDayjs(val, fmt) {
  if (val == null) return null;
  if (dayjs.isDayjs(val)) return val;
  return fmt ? dayjs(val, fmt) : dayjs(val);
}

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
    <div>
      <Typography
        variant="h6"
        sx={{
          fontSize: ".9rem",
          fontWeight: 600,
          textTransform: "capitalize",
          mb: 1,
        }}
      >
        {label} Date&nbsp;&amp;&nbsp;Time:
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2}>
        <DatePicker
          value={toDayjs(dateValue, "DD/MM/YYYY")}
          onChange={onDateChange}
          minDate={toDayjs(minDate, "DD/MM/YYYY")}
          maxDate={toDayjs(maxDate, "DD/MM/YYYY")}
          sx={{ width: "100%" }}
        />

        <TimePicker
          value={toDayjs(timeValue, "HH:mm")}
          onChange={onTimeChange}
          disabled={!dateValue}
          sx={{ width: "100%" }}
        />
      </Stack>
    </div>
  );
}
