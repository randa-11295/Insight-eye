import React from "react";
import { Paper, Stack } from "@mui/material";
import Holder from "../Components/HOC/Holder";
import HighlightedText from "../Components/Reusable/HighlightedText";

const personalInfo = [
    { title: "First Name", val: "Randa" },
    { title: "Last Name", val: "Mohamed" },
    { title: "Email", val: "Randa.12@gmail.com" },
    { title: "Company Name", val: "Spacetoon" },
];

const cameraStatuses = [
    { title: "Camera 1", val: "on" },
    { title: "Camera 12", val: "off" },
    { title: "Camera 45", val: "on" },
    { title: "Camera 2334", val: "on" },
    { title: "Camera 22", val: "off" },
    { title: "Camera 34", val: "off" },
    { title: "Camera e3e", val: "on" },
    { title: "Camera 3", val: "off" },
    { title: "Camera 3", val: "on" },
];

const systemInfo = [
    { title: "Frame Rate", val: "30" },
    { title: "Confidence Level", val: "0.60" },
];

const RenderSection = ({ title, data, fullWidth = false }) => (
    data.length > 0 && (
        <Stack 
            sx={{ 
                flex: fullWidth ? "1 1 100%" : "1 1 45%", 
            }}
        >
            <Holder title={title}>
                <Paper 
                    sx={{ 
                        padding: 2, 
                        height: "100%", // Ensures full height
                    }}
                >
                    <Stack 
                        gap={2} 
                        direction={fullWidth ? "row" : "column"} 
                        justifyContent={fullWidth ? "space-between" : "flex-start"}
                        sx={{ flex: 1 }} // Ensures inner content stretches
                    >
                        {data.map((item, index) => (
                            <HighlightedText key={index} title={item.title} val={item.val} />
                        ))}
                    </Stack>
                </Paper>
            </Holder>
        </Stack>
    )
);

const MyGridLayout = () => {
    return (
        <Stack 
            direction="row" 
            flexWrap="wrap" 
            gap={4} 
            justifyContent="space-between"
            alignItems="stretch" // Ensures all items stretch to the same height
        >
            <RenderSection title="Personal Info" data={personalInfo} />
            <RenderSection title="Camera Status" data={cameraStatuses} />
            <RenderSection title="System Information" data={systemInfo} fullWidth />
        </Stack>
    );
};

export default MyGridLayout;
