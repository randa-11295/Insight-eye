import { useEffect, useState } from 'react';
import { Box, Card, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../utils/StaticVariables';
import { useRecoilValue } from 'recoil';
import { authState } from '../Recoil/RecoilState';
import { useSnackbar } from 'notistack';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setLoading(true);
   
    axios
    .get(`${baseURL}auth/logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setLogs(res.data.logs || []))
      .catch(err => {
        setError(err.response?.data?.message || err.message);
        enqueueSnackbar(error.massage, {
          variant: "error",
        }) 
      })
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = iso => new Date(iso).toLocaleDateString('en-GB');
  const formatTime = iso => new Date(iso).toLocaleTimeString('en-GB');

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box px={2} py={4}>
        <Typography color="error" align="center">
          Error loading logs: {error}
        </Typography>
      </Box>
    );
  }

  if (!logs.length) {
    return (
      <Box px={2} py={4}>
        <Typography color="text.secondary" align="center">
          No logs to display.
        </Typography>
      </Box>
    );
  }

  return (
    <Box px={2} py={1}>
      <Box display="flex" gap={2} p={2} flexWrap="wrap">
        <Typography flex={1} color="primary" fontWeight="bold">
          Date
        </Typography>
        <Typography flex={1} color="primary" fontWeight="bold">
          Time
        </Typography>
        <Typography flex={2} color="primary" fontWeight="bold">
          Activity
        </Typography>
      </Box>

      {logs.map((log, i) => (
        <Card
          key={log.log_id}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            p: 2,
            mb: i < logs.length - 1 ? 1 : 0,
            borderRadius: 1,
          }}
        >
          <Typography flex={1} variant="body2" color="text.secondary">
            {formatDate(log.created_at)}
          </Typography>
          <Typography flex={1} variant="body2" color="text.secondary">
            {formatTime(log.created_at)}
          </Typography>
          <Typography
            flex={2}
            variant="body2"
            color="text.secondary"
            sx={{ textTransform: 'capitalize' }}
          >
            {`${log.action_type.replace(/_/g, ' ')} ${log.content}`}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
