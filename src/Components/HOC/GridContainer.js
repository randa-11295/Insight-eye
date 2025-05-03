import React from "react";
import Grid from "@mui/material/Grid";

const GridContainer = ({ items }) => {
  return (
    <Grid container spacing={3}>
      {items?.map((item, index) => (
        <Grid item key={index} xs={12} md={6} lg={4} xl={3}>
          {item}
        </Grid>
      ))}
    </Grid>
  );
};

export default GridContainer;
