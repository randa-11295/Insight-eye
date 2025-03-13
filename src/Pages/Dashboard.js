import React from "react";
import { Grid, Paper } from "@mui/material";

const MyGridLayout = () => {
  return (
    <Grid container spacing={2}>
      {/* Top Left */}
      <Grid item xs={12} sm={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>Section 1</Paper>
      </Grid>

      {/* Top Right */}
      <Grid item xs={12} sm={6}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>Section 2</Paper>
      </Grid>

      {/* Full-Width Row */}
      <Grid item xs={12}>
        <Paper sx={{ padding: 2, textAlign: "center" }}>Section 3</Paper>
      </Grid>
    </Grid>
  );
};

export default MyGridLayout;
