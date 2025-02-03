import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";
import StreamTable from "../../Components/Stream/StreamTable"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";

const Streams = () => {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const changeSelectDataRow = (selectedNewData) => {
        const isInSelectedData = selectedData.find(el => selectedNewData.id === el.id); // Returns 30

        !isInSelectedData ? setSelectedData([...selectedData, selectedNewData]) : setSelectedData(selectedData.filter(el => selectedNewData.id !== el.id))
        console.log(isInSelectedData, selectedNewData)
    }
    useEffect(() => {
        axios.get(baseURL + "/stream", {
            headers: {
                'Content-Type': 'application/json'
            },
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
                <CustomBtn handle={() => navigate("/streams/add-stream")}> Add New Stream</CustomBtn>
            } >
            <Box my={2}>
                <StreamTable handelChangeSelect={changeSelectDataRow} data={data} />
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
