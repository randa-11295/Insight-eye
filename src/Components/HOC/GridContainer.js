import React from "react";
import Grid from "@mui/material/Grid";

const GridContainer = ({ items }) => {
  return (
  
      <Grid container spacing={5}  sx={{ my: 5}}>
        {items?.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            {item}
          </Grid>
        ))}
      </Grid>
  );
};

export default GridContainer;
