import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function Otp() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'success' });

  const inputRefs = [
     useRef(null),
     useRef(null),
     useRef(null),
     useRef(null),
     useRef(null),
     useRef(null)
   ];
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email format').required('Email is required'),
    }),
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post('/send-otp', { email: values.email })
        .then((res) => {
          console.log(Otp)
          setOtpSent(true);
          setAlert({ open: true, message: 'OTP sent successfully!', severity: 'success' });
        })
        .catch(() => {
          setAlert({ open: true, message: 'Failed to send OTP. Try again.', severity: 'error' });
        })
        .finally(() => setLoading(false));
    },
  });

  const handleVerifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setAlert({ open: true, message: 'Please enter the complete OTP', severity: 'error' });
      return;
    }

    setLoading(true);
    axios
      .post('/verify-otp', { email: formik.values.email, otp: otpString })
      .then(() => {
        setAlert({ open: true, message: 'OTP verified successfully!', severity: 'success' });
      })
      .catch(() => {
        setAlert({ open: true, message: 'Invalid OTP. Try again.', severity: 'error' });
      })
      .finally(() => setLoading(false));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs[index + 1].current.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant="h5" gutterBottom>OTP Verification</Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          disabled={otpSent}
        />

        {otpSent && (
          <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', my: 2 }}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                inputRef={inputRefs[index]}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                variant="outlined"
                sx={{ width: '48px', textAlign: 'center', fontSize: '1.2rem' }}
                inputProps={{ maxLength: 1, inputMode: 'numeric' }}
              />
            ))}
          </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          type={otpSent ? 'button' : 'submit'}
          onClick={otpSent ? handleVerifyOtp : undefined}
          disabled={loading}
          sx={{ height: 48 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : otpSent ? 'Verify OTP' : 'Send OTP'}
        </Button>

        {otpSent && (
          <Button fullWidth variant="text" onClick={() => setOtpSent(false)}>Change Email</Button>
        )}
      </form>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, open: false })}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Otp;
