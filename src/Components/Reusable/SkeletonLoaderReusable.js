import React from "react";
import { Skeleton, Grid } from "@mui/material";

const SkeletonLoaderReusable = ({ count = 12 }) => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: count }).map((_, index) => (
        <Grid item key={index} xs={12} sm={6} lg={4} my={5}>
          <Skeleton
            variant="rectangular"
            height={220}
            sx={{ borderRadius: 2 }}
          />
          <Skeleton width="80%" height={50} sx={{ mt: 1 }} />
          <Skeleton width="60%" height={30} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SkeletonLoaderReusable;
