import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CircularProgress,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";
import PredictionsChart from "./PredictionsChart";
import { baseURL } from "../../utils/StaticVariables";

/**
 * Props:
 *  • streamId   – camera ID used in the request
 *  • streamName – title shown at the top of the card
 */
const PredictionsCard = ({ streamId, streamName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionsData, setPredictionsData] = useState({}); // { next_hour: 34, ... }

  useEffect(() => {
    const fetchStreams = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${baseURL}prediction_data?camera_id=${streamId}`,
          {
            headers: { Authorization: `Bearer ${localStorage.token}` },
          }
        );
        setPredictionsData(data?.predictions?.[0]?.prediction || {});
        setError(null);
      } catch (err) {
        console.error("Error fetching prediction data:", err);
        setError("Failed to load prediction data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, [streamId]);

  return (
    <Card
      elevation={4}
      sx={{
        width: "100%",
        height: 350,
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Title */}
      <Typography variant="h6" textAlign="center" mb={1}>
        {streamName}
      </Typography>

      {/* Chart / State */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : Object.keys(predictionsData).length === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No data available
          </Typography>
        ) : (
          <PredictionsChart predictionsData={predictionsData} />
        )}
      </Box>

      {/* Divider + Bottom Stats */}
      {!loading && !error && Object.keys(predictionsData).length > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Stack
            direction="row"
            justifyContent="space-around"
            spacing={2}
            flexWrap="wrap"
          >
            {Object.entries(predictionsData).map(([key, value]) => (
              <Typography key={key} variant="body2">
                {key.replace(/_/g, " ")}:{" "}
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
      )}
    </Card>
  );
};

export default PredictionsCard;
