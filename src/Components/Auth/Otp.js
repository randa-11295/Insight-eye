import React, { useState, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
// import { KeyRound } from 'lucide-react';
import axios from 'axios';

function Otp() {
  const [email, setEmail] = useState('');
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

  const handleSendOtp = () => {
    if (!email) {
      setAlert({
        open: true,
        message: 'Please enter your email',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    axios
      .post('/send-otp', { email })
      .then(() => {
        setOtpSent(true);
        setAlert({
          open: true,
          message: 'OTP sent successfully!',
          severity: 'success'
        });
      })
      .catch(() => {
        setAlert({
          open: true,
          message: 'Failed to send OTP. Please try again.',
          severity: 'error'
        });
      })
      .finally(() => {
          setOtpSent(true);
        setLoading(false);
      });
  };

  const handleVerifyOtp = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setAlert({
        open: true,
        message: 'Please enter the complete OTP',
        severity: 'error'
      });
      return;
    }

    setLoading(true);
    axios
      .post('/verify-otp', { email, otp: otpString })
      .then(() => {
        setAlert({
          open: true,
          message: 'OTP verified successfully!',
          severity: 'success'
        });
      })
      .catch(() => {
        setAlert({
          open: true,
          message: 'Invalid OTP. Please try again.',
          severity: 'error'
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <Box>
    
        {/* <KeyRound size={40} color="#1976d2" /> */}
        <Typography variant="h5" component="h1" gutterBottom>
          OTP Verification
        </Typography>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />

          {otpSent && (
            <Box sx={{ 
              display: 'flex', 
              gap: 1, 
              justifyContent: 'space-between',
              my: 2 
            }}>
              {otp.map((digit, index) => (
                <TextField
                  key={index}
                  inputRef={inputRefs[index]}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  variant="outlined"
                  sx={{
                    width: '48px',
                    '& input': {
                      textAlign: 'center',
                      fontSize: '1.2rem',
                      padding: '12px 0',
                    }
                  }}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric'
                  }}
                />
              ))}
            </Box>
          )}

          <Button
            fullWidth
            variant="contained"
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            disabled={loading}
            sx={{ height: 48 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              otpSent ? 'Verify OTP' : 'Send OTP'
            )}
          </Button>

          {otpSent && (
            <Button
              fullWidth
              variant="text"
              onClick={() => {
                setOtpSent(false);
                setOtp(['', '', '', '', '', '']);
              }}
            >
              Change Email
            </Button>
          )}
        </Box>
     

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
      >
        <Alert 
          onClose={() => setAlert({ ...alert, open: false })} 
          severity={alert.severity === 'success' ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Otp;