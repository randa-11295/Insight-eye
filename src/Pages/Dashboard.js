import React from "react";
import { Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import Holder from "../Components/HOC/Holder";
import HighlightedText from "../Components/Reusable/HighlightedText";
const MyGridLayout = () => {
    return (
        <Grid container spacing={4}>
            {/* Top Left */}
            <Grid item xs={12} sm={6}>
                <Holder title="test">
                    <Paper sx={{ padding: 2 }}>
                        <Stack gap={2} >
                            <HighlightedText title="First Name" val="Randa" />
                            <HighlightedText title="last Name" val="Mohamed" />
                            <HighlightedText title="Email" val="Randa.12@gmail.com" />
                            <HighlightedText title="Company Name" val="Spacetoon" />
                        </Stack>
                    </Paper>
                </Holder>
            </Grid>

            {/* Top Right */}
            <Grid item xs={12} sm={6}>
                <Holder title="test">
                    <Paper sx={{ padding: 2 }}>
                        <Stack gap={2} >
                            <HighlightedText title="Camera 1" val="on" />
                            <HighlightedText title="Camera 12" val="off" />
                            <HighlightedText title="Camera 45" val="on" />
                            <HighlightedText title="Camera 2334" val="on" />
                            <HighlightedText title="Camera 22" val="off" />
                            <HighlightedText title="Camera 34" val="off" />
                            <HighlightedText title="Camera e3e" val="on" />
                            <HighlightedText title="Camera 3" val="off" />
                            <HighlightedText title="Camera 3" val="on" />

                        </Stack>
                    </Paper>
                </Holder>
            </Grid>

            {/* Full-Width Row */}
            <Grid item xs={12}>
                <Holder title="System information">
                    <Paper sx={{ padding: 2 }}>
                        <Stack gap={2} direction={{ sm: "row" }} justifyContent="space-between">
                            <HighlightedText title="Frame Rate" val="30" />
                            <HighlightedText title="Confidence Level" val="0.60" />
                        </Stack>
                    </Paper>

                </Holder>
            </Grid>
        </Grid>
    );
};

export default MyGridLayout;
