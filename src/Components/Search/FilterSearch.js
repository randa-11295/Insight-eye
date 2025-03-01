import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Card, CardContent, Typography } from '@mui/material';
import dayjs from 'dayjs';

export default function FilterSearch({
  startDateTime,
  endDateTime,
  onStartDateTimeChange,
  onEndDateTimeChange,
}) {
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

  const handleStartTimeChange = (time) => {
    if (!time || !startDateTime) {
      return;
    }
    const newDateTime = startDateTime
      .hour(time.hour())
      .minute(time.minute());
    onStartDateTimeChange(newDateTime);
  };

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

  const handleEndTimeChange = (time) => {
    if (!time || !endDateTime) {
      return;
    }
    const newDateTime = endDateTime
      .hour(time.hour())
      .minute(time.minute());
    onEndDateTimeChange(newDateTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card className="w-full max-w-2xl">
        <CardContent>
          <Typography variant="h6" className="mb-4">
            Select Date and Time Range
          </Typography>
          
          <div className="space-y-6">
            {/* Start Date and Time */}
            <div>
              <Typography variant="subtitle2" className="mb-2 text-gray-700">
                Start
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="Start Date"
                  value={startDateTime}
                  onChange={handleStartDateChange}
                  maxDate={endDateTime || undefined}
                  className="w-full"
                />
                <TimePicker
                  label="Start Time"
                  value={startDateTime}
                  onChange={handleStartTimeChange}
                  className="w-full"
                  disabled={!startDateTime}
                />
              </div>
            </div>

            {/* End Date and Time */}
            <div>
              <Typography variant="subtitle2" className="mb-2 text-gray-700">
                End
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="End Date"
                  value={endDateTime}
                  onChange={handleEndDateChange}
                  minDate={startDateTime || undefined}
                  className="w-full"
                />
                <TimePicker
                  label="End Time"
                  value={endDateTime}
                  onChange={handleEndTimeChange}
                  className="w-full"
                  disabled={!endDateTime}
                />
              </div>
            </div>
          </div>
          
          {startDateTime && endDateTime && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <Typography variant="body2" className="text-blue-800">
                Duration: {dayjs(endDateTime).diff(startDateTime, 'hours')} hours
              </Typography>
            </div>
          )}
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
}