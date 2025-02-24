import React, { useEffect, useState } from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useRecoilState, useSetRecoilState } from "recoil";
import { popupState, selectedStreamState } from "../../Recoil/RecoilState";
import TableReusable from "../../Components/Reusable/TableReusable";
import { streamColumns } from "../../utils/StaticVariables";

const Streams = () => {
    const navigate = useNavigate();
    const [streamData, setStreamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const setPopup = useSetRecoilState(popupState);
    const [selectedData, setSelectedStream] = useRecoilState(selectedStreamState); 

    // Function to update selected rows using Recoil
    const changeSelectDataRow = (selectedNewData) => {
        const isInSelectedData = selectedData.some(el => selectedNewData.id === el.id);
        setSelectedStream(isInSelectedData 
            ? selectedData.filter(el => el.id !== selectedNewData.id) 
            : [...selectedData, selectedNewData]
        );
    };

    const getAllStreams = () => {
        axios.get(baseURL + "/source")
            .then(response => {
                console.log(response.data);
                setStreamData(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        getAllStreams();
    }, []);

    const handelDeleteReqFromApi = () => {
        const selectedIDs = selectedData.map(el => el.id);

        axios.delete(baseURL + "/source", {
            data: { ids: selectedIDs }
        })
            .then(() => {
                getAllStreams();
                setSelectedStream([]); // Clear selection after deletion
            })
            .catch(error => console.log(error));
    };

    const openPopup = () => {
        setPopup({
            isOpen: true,
            title: "Remove Stream",
            content: "Are you sure?",
            sendReq: handelDeleteReqFromApi,
        });
    };

    return (
        <Holder
            title="All Streams"
            action={
                <CustomBtn handle={() => navigate("/streams/add-stream")}>
                    Add New Stream
                </CustomBtn>
            }
        >
            <Box my={2}>
                <TableReusable handelChangeSelect={changeSelectDataRow} showCheckbox data={streamData} columns={streamColumns} loading={loading} />
            </Box>
            <Stack direction="row" justifyContent="space-between" gap={2}>
                <CustomBtn 
                    disable={selectedData?.length < 1} 
                    color="error" 
                    isLined 
                    handle={openPopup}
                > 
                    Delete 
                </CustomBtn>
                <Stack direction="row" gap={2}>
                    <CustomBtn 
                        disable={selectedData?.length < 1} 
                        isLined 
                        handle={() => navigate("/streams/update-streams")}
                    >
                        Update
                    </CustomBtn>
                    <CustomBtn 
                        disable={selectedData?.length < 1} 
                        handle={() => navigate("/streams/show-streams")}
                    >
                        Show Stream
                    </CustomBtn>
                </Stack>
            </Stack>
        </Holder>
    );
};

export default Streams;
