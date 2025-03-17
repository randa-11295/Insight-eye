import axios from "axios";
import Holder from "../../Components/HOC/Holder";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import TableReusable from "../../Components/Reusable/TableReusable";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utils/StaticVariables";
import { useEffect, } from "react";
import { Box, Stack } from "@mui/system";
import { useRecoilState, useSetRecoilState } from "recoil";
import { popupState, selectedStreamState } from "../../Recoil/RecoilState";
import { streamColumns } from "../../utils/StaticVariables";
import useAxios from "../../Components/Hooks/useAxios";

const Streams = () => {

    const navigate = useNavigate();
    const setPopup = useSetRecoilState(popupState);
    const [selectedData, setSelectedStream] = useRecoilState(selectedStreamState);


    const { data, loading, fetchData } = useAxios({
        url: "/source",
        method: "GET",
      });
    
      useEffect(() => {
        fetchData(); 
      }, [fetchData]);
    

    // Function to update selected rows using Recoil
    const changeSelectDataRow = (selectedNewData) => {
        const isInSelectedData = selectedData.some(el => selectedNewData.id === el.id);
        setSelectedStream(isInSelectedData
            ? selectedData.filter(el => el.id !== selectedNewData.id)
            : [...selectedData, selectedNewData]
        );
    };



    const handelDeleteReqFromApi = () => {
        const selectedIDs = selectedData.map(el => el.id);

        axios.delete(baseURL + "/source", {
            data: { ids: selectedIDs }
        })
            .then(() => {
                // getAllStreams();
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
                <TableReusable handelChangeSelect={changeSelectDataRow} showCheckbox data={data} columns={streamColumns} loading={loading} />
            </Box>
            <Stack direction="row" justifyContent="space-between" gap={2}>
                <CustomBtn
                    disable={data?.length < 1}
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
