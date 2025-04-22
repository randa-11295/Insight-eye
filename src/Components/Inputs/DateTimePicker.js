import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);          // let dayjs understand 1/1/2022, 12:12, etc.

function toDayjs(val, fmt = undefined) {
  // null / undefined ➜ null
  if (val == null) return null;

  // Already a dayjs object ➜ return as‑is
  if (dayjs.isDayjs(val)) return val;

  // Otherwise parse the string / Date
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
        sx={{ fontSize: ".9rem", fontWeight: 600, textTransform: "capitalize", mb: 1 }}
      >
        {label} Date&nbsp;&amp;&nbsp;Time:
      </Typography>

      <Stack sx={{ flexDirection: { md: "row" } }} gap={2}>
        <DatePicker
          value={toDayjs(dateValue, "D/M/YYYY")}   // 🔑 convert or pass dayjs directly
          onChange={(d) => onDateChange(d, label)} // d is a dayjs object
          minDate={toDayjs(minDate, "D/M/YYYY")}
          maxDate={toDayjs(maxDate, "D/M/YYYY")}
          sx={{ width: "100%" }}
        />

        {/* Uncomment when ready */}
        <TimePicker
          value={toDayjs(timeValue, "HH:mm")}
          onChange={(t) => onTimeChange(t, label)}
          disabled={!dateValue}
          sx={{ width: "100%" }}
        />
      </Stack>
    </div>
  );
}
