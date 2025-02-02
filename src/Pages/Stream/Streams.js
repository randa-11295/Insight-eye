import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";
import StreamTable from "../../Components/Stream/StreamTable"
import { useEffect, useState } from "react";
import axios from "axios";

const Streams = () => {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://16.170.216.227/stream", {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true // Try this if authentication is required
        })
            .then(response => {
                console.log(response.data)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <Holder
            title="All Streams"
            action={
                <CustomBtn handle={() => navigate("/streams/add-stream")}
                > Add New Stream</CustomBtn>
            } >
            <Box my={2}>
                <StreamTable data={data}/>
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
