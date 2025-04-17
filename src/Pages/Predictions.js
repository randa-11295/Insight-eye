// Predictions.jsx  –  MUI‑styled version
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Alert,
  Button,
  Typography,
} from "@mui/material";
import PredictionsCard from "../Components/Cards/PredictionsCard";
import { baseURL } from "../utils/StaticVariables";

/**
 * StreamSelector (MUI)
 * --------------------
 * Renders one checkbox per stream in a responsive Grid.
 */
const StreamSelector = ({ streams, selectedIds, onToggle }) => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    {streams.map((stream) => (
      <Grid item xs={12} sm={6} md={4} key={stream.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedIds.includes(stream.id)}
              onChange={() => onToggle(stream.id)}
              // tint with primary colour but you can override here
              sx={{
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          }
          label={stream.name}
        />
      </Grid>
    ))}
  </Grid>
);

const Predictions = () => {
  /* --------------------------- state --------------------------- */
  const [streams, setStreams] = useState([]);
  const [selectedIds, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ----------------------- fetch on mount ---------------------- */
  useEffect(() => {
    fetchStreams();
  }, []);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseURL}source`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });
      setStreams(data);
      setSelected(data.map((s) => s.id)); // check everything by default
      setError(null);
    } catch (err) {
      console.error("Error fetching stream data:", err);
      setError("Failed to load camera list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------- checkbox toggle handler -------------- */
  const handleToggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  /* -------------------- render states ------------------- */
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={fetchStreams}>
            Retry
          </Button>
        }
        sx={{ mt: 4 }}
      >
        {error}
      </Alert>
    );
  }

  /* -------------------------- UI ------------------------- */
  return (
    <Fragment>
      {/* 1️⃣  Selector */}
      <StreamSelector
        streams={streams}
        selectedIds={selectedIds}
        onToggle={handleToggle}
      />

      {/* 2️⃣  Cards */}
      <Grid container spacing={3}>
        {selectedIds.map((id) => {
          const stream = streams.find((s) => s.id === id);
          return (
            <Grid item xs={12} md={6} key={id}>
              <PredictionsCard
                streamId={id}
                streamName={stream?.name}
                status={stream?.status}
              />
            </Grid>
          );
        })}

        {selectedIds.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body2" fontStyle="italic" textAlign="center">
              Select at least one camera to see its predictions.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Fragment>
  );
};

export default Predictions;
