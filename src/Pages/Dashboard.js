import React from "react";
import { Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Holder from "../Components/HOC/Holder";
const MyGridLayout = () => {
    return (
        <Grid container spacing={2}>
            {/* Top Left */}
            <Grid item xs={12} sm={6}>
                <Holder title="test">
                    <Paper sx={{ padding: 2, textAlign: "center" }}>Section 2</Paper>

                </Holder>
            </Grid>

            {/* Top Right */}
            <Grid item xs={12} sm={6}>
                <Holder title="test">
                    <Paper sx={{ padding: 2, textAlign: "center" }}>Section 2</Paper>

                </Holder>
            </Grid>

            {/* Full-Width Row */}
            <Grid item xs={12}>
                <Holder title="System information">
                    <Paper sx={{ padding: 2, textAlign: "center" }}>

                        <Stack direction={{sm:"row"}} justifyContent="space-between">
                            <Typography>
                                Frame Rate :
                                <Typography component="b" color="primary.main" sx={{ fontWeight: "900", margin: "10px" }}>
                                    30
                                </Typography>
                            </Typography>
                   
                            <Typography>
                                Confidence Level :
                                <Typography component="b" color="primary.main" sx={{ fontWeight: "900", margin: "10px" }}>
                                    0.60
                                </Typography>
                            </Typography>
                        </Stack>
                    </Paper>

                </Holder>
            </Grid>
        </Grid>
    );
};

export default MyGridLayout;
