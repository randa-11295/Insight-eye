// PredictionsCard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CircularProgress, Typography, Box } from "@mui/material";
import PredictionsChart from "./PredictionsChart";
import { baseURL } from "../../utils/StaticVariables";

/**
 * Props:
 *   • streamId   – ID of the stream to show in the chart
 *   • streamName – human‑readable name displayed at the top
 */
const PredictionsCard = ({ streamId, streamName }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionsData, setPredictionsData] = useState([]); // fetched list
  const [selected, setSelected] = useState([]); // array of IDs

  useEffect(() => {
    fetchStreams();
    // eslint‑disable‑next‑line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const fetchStreams = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${baseURL}prediction_data?camera_id=${streamId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        }
      );
      console.log(data.predictions[0].prediction);
      setPredictionsData(data.predictions[0].prediction);
      // setSelected(data.map((s) => s.id)); // check everything by default
      // setError(null);
    } catch (err) {
      console.error("Error fetching stream data:", err);
      setError("Failed to load camera list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: 300,
        my: 4,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
      elevation={4}
    >
      {/* Title */}
      <Typography variant="h6" component="h2" mb={1} textAlign={"center"}>
        {streamName}
      </Typography>

      {/* Content */}
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
        {error && !loading &&  <Typography color="error">{error}</Typography>}
        {!loading && !error && (
          <PredictionsChart predictionsData={predictionsData} />
        )}
      </Box>
    </Card>
  );
};

export default PredictionsCard;
