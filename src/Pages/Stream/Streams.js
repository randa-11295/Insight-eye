import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box } from "@mui/system";
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
            <Box mt={2}>
                <StreamTable />
            </Box>
        </Holder>
    );
};

export default Streams;
