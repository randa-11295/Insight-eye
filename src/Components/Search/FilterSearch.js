import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateTimePicker from "../Inputs/DateTimePicker"; // Import reusable component
import { useState } from "react";

export default function FilterSearch({
    startDateTime,
    endDateTime,
    onStartDateTimeChange,
    onEndDateTimeChange,
}) {
    // Handle Start Date Change

    const [startDate, setStartDate] = useState(null);
    const [endData, setEndData] = useState(null);

    const getDateHandle = (date, label) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB").format(date);
        label === "Start" ? setStartDate(formattedDate) : setEndData(formattedDate)
    };

    useEffect(() => {
        console.log(startDate, endData)
    }, [endData, startDate])

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
                label="Start"

                dateValue={startDateTime}
                timeValue={startDateTime}
                onDateChange={getDateHandle}
                // onTimeChange={handleStartTimeChange}
                maxDate={endDateTime || undefined}
                disableTime={!startDateTime} // Disable time if no date is selected
            />

            {/* End Date & Time Picker */}
            <DateTimePicker
                label="End"

                dateValue={endDateTime}
                timeValue={endDateTime}
                onDateChange={getDateHandle}
                // onTimeChange={handleEndTimeChange}
                minDate={startDateTime || undefined}
                disableTime={!endDateTime} // Disable time if no date is selected
            />
        </LocalizationProvider>
    );
}
