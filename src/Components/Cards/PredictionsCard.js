// src/Components/Cards/PredictionsCard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CircularProgress, Typography, Box, Stack } from "@mui/material";
import PredictionsChart from "./PredictionsChart";
import { baseURL } from "../../utils/StaticVariables";

/**
 * Props
 *  • streamId   – camera ID used in the request
 *  • streamName – title shown at the top of the card
 */
const PredictionsCard = ({ streamId, streamName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionsData, setPredictionsData] = useState({}); // object → { next_hour: 34, ... }

  /* ─────────────────────────────────  Fetch on mount  ───────────────────────────────── */
  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseURL}prediction_data?camera_id=${streamId}`,
          { headers: { Authorization: `Bearer ${localStorage.token}` } }
        );

        // API returns: { predictions: [{ prediction: { next_hour, next_day, next_week } }] }
        setPredictionsData(data?.predictions?.[0]?.prediction || {});
      } catch (err) {
        console.error("Error fetching stream data:", err);
        setError("Failed to load camera list. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  /* ────────────────────────────────  Render  ──────────────────────────────── */
  return (
    <>
      <Card
        elevation={4}
        sx={{
          width: "100%",
          height: 300,
          p: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* title */}
        <Typography variant="h6" textAlign="center" mb={1}>
          {streamName}
        </Typography>
        {/* quick stats / empty‑state */}
        {!loading &&
          !error &&
          (Object.keys(predictionsData).length === 0 ? (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              mt={1}
            >
              No data available
            </Typography>
          ) : (
            <Box
              sx={{
                flex: 1,
                minHeight: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loading && <CircularProgress />}
              {error && !loading && (
                <Typography color="error">{error}</Typography>
              )}
              {!loading && !error && (
                <PredictionsChart
                  predictionsData={predictionsData}
                />
              )}
            </Box>
          ))}
      </Card>
      <Stack direction="row" justifyContent="space-around" spacing={2} mt={1}>
        {Object.entries(predictionsData).map(([key, value]) => (
          <Typography key={key} variant="body1">
            {key.replace(/_/g, " ")} :{" "}
            <Box
              component="span"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              {value}
            </Box>
          </Typography>
        ))}
      </Stack>
    </>
  );
};

export default PredictionsCard;
