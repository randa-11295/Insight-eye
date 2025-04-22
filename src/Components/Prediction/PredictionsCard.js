import React, { useEffect } from "react";
import { Card, Typography, Box, Stack, Divider } from "@mui/material";
import PredictionsChart from "./PredictionsChart";

const PredictionsCard = ({ data }) => {
  const { name, prediction } = data;

  const hasData = prediction && Object.keys(prediction).length > 0;

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
        {name}
      </Typography>

      {/* Chart or Fallback */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasData ? (
          <PredictionsChart predictionsData={prediction} />
        ) : (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No data available
          </Typography>
        )}
      </Box>

      {/* Divider + Stats */}
      {hasData && (
        <>
          <Divider sx={{ my: 1 }} />
          <Stack
            direction="row"
            justifyContent="space-around"
            spacing={2}
            flexWrap="wrap"
          >
            {Object.entries(prediction).map(([key, value]) => (
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
