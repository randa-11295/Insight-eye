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

/* StreamSelector (MUI) */
const StreamSelector = ({ streams, selectedIds, onToggle, loading }) => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    {streams.map((stream) => (
      <Grid item xs={12} sm={6} md={4} key={stream.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedIds.includes(stream.id)}
              onChange={() => onToggle(stream.id)}
              disabled={loading}
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
  const [streams, setStreams] = useState([]);
  const [selectedIds, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const handleToggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  return (
    <Fragment>
      {/* Error message */}
      {error && (
        <p>some thing wrong</p>
      )}

      {/* Selector */}
      <StreamSelector
        streams={streams}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        loading={loading}
      />

      {/* Loader */}
      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {/* Cards */}
      {!loading && (
        <Grid container spacing={3}>
          {selectedIds.map((id) => {
            const stream = streams.find((s) => s.id === id);
            return (
              <Grid item xs={12} md={6} key={id}>
                <PredictionsCard streamId={id} streamName={stream?.name} />
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
      )}
    </Fragment>
  );
};

export default Predictions;
