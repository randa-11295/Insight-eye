import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";
import StreamTable from "../../Components/Stream/StreamTable"
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useSetRecoilState } from "recoil";
import { popupState } from "../../Recoil/RecoilState";

const Streams = () => {

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [selectedData, setSelectedData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const setPopup = useSetRecoilState(popupState);

    const changeSelectDataRow = (selectedNewData) => {
        const isInSelectedData = selectedData.find(el => selectedNewData.id === el.id); // Returns 30

        !isInSelectedData ? setSelectedData([...selectedData, selectedNewData]) : setSelectedData(selectedData.filter(el => selectedNewData.id !== el.id))
    }

    const getAllStreams = () => {
        axios.get(baseURL + "/stream",)
            .then(response => {
                console.log(response.data)
                setData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }
    useEffect(() => {
        getAllStreams()

    }, []);




    const handelDeleteReqFromApi = () => {
        const selectedIDs = selectedData.map(el => el.id)
        console.log(selectedIDs)


        axios.delete(baseURL + "/stream", {
            data: { ids: selectedIDs }
        })
            .then(response => {
                getAllStreams()
                setSelectedData()

                // setLoading(false);
            })
            .catch(error => {
                console.log(error)
                // setError(error);
                // setLoading(false);
            });

    }
    const openPopup = () => {
        setPopup({
            isOpen: true,
            title: "remove Stream",
            content: "are  you sure",
            sendReq: handelDeleteReqFromApi,
        });
    };
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
                <CustomBtn disable={selectedData.length < 1} color="error" isLined handle={openPopup}
                > Delete </CustomBtn>
                <Stack direction="row" gap={2}>
                    <CustomBtn disable={selectedData.length < 1} isLined handle={() => navigate("/streams/add-stream")}
                    > Update</CustomBtn>
                    <CustomBtn disable={selectedData.length < 1} handle={() => navigate("/streams/show-streams")}
                    > Show Stream</CustomBtn>
                </Stack>
            </Stack>
        </Holder>
    );
};

export default Streams;
