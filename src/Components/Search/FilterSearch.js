import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePicker from "../Inputs/DateTimePicker"; // Import reusable component
// import dayjs from "dayjs";

export default function FilterSearch({
    startDateTime,
    endDateTime,
    onStartDateTimeChange,
    onEndDateTimeChange,
}) {
    // Handle Start Date Change
    const handleStartDateChange = (date) => {
        if (!date) {
            onStartDateTimeChange(null);
            return;
        }
        const newDateTime = startDateTime
            ? date.hour(startDateTime.hour()).minute(startDateTime.minute())
            : date.hour(0).minute(0);
        onStartDateTimeChange(newDateTime);
    };

    // Handle Start Time Change
    const handleStartTimeChange = (time) => {
        if (!time) return;
        if (!startDateTime) return;
        onStartDateTimeChange(startDateTime.hour(time.hour()).minute(time.minute()));
    };

    // Handle End Date Change
    const handleEndDateChange = (date) => {
        if (!date) {
            onEndDateTimeChange(null);
            return;
        }
        const newDateTime = endDateTime
            ? date.hour(endDateTime.hour()).minute(endDateTime.minute())
            : date.hour(23).minute(59);
        onEndDateTimeChange(newDateTime);
    };

    // Handle End Time Change
    const handleEndTimeChange = (time) => {
        if (!time) return;
        if (!endDateTime) return;
        onEndDateTimeChange(endDateTime.hour(time.hour()).minute(time.minute()));
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* Start Date & Time Picker */}
            <DateTimePicker
                label="Start Date & Time"
                dateValue={startDateTime}
                timeValue={startDateTime}
                onDateChange={handleStartDateChange}
                onTimeChange={handleStartTimeChange}
                maxDate={endDateTime || undefined}
                disableTime={!startDateTime} // Disable time if no date is selected
            />

            {/* End Date & Time Picker */}
            <DateTimePicker
                label="End Date & Time"
                dateValue={endDateTime}
                timeValue={endDateTime}
                onDateChange={handleEndDateChange}
                onTimeChange={handleEndTimeChange}
                minDate={startDateTime || undefined}
                disableTime={!endDateTime} // Disable time if no date is selected
            />
        </LocalizationProvider>
    );
}
  