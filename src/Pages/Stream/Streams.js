import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";
import StreamTable from "../../Components/Stream/StreamTable"

const Streams = () => {
    const navigate = useNavigate();

    return (
        <Holder
            title="All Streams"
            action={
                <CustomBtn handle={() => navigate("/streams/add-stream")}
                > Add New Stream</CustomBtn>
            } >
            <Box my={2}>
                <StreamTable />
            </Box>
            <Stack direction="row" justifyContent="space-between" gap={2}>
                <CustomBtn color="error" isLined handle={() => navigate("/streams/add-stream")}
                > Delete </CustomBtn>
                <Stack direction="row" gap={2}>
                    <CustomBtn isLined handle={() => navigate("/streams/add-stream")}
                    > Update</CustomBtn>
                    <CustomBtn handle={() => navigate("/streams/add-stream")}
                    > Show Stream</CustomBtn>
                </Stack>
            </Stack>
        </Holder>
    );
};

export default Streams;
