import Holder from "../../Components/HOC/Holder";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import TableReusable from "../../Components/Reusable/TableReusable";
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/system";
import {
  popupState,
  selectedStreamState,
  streamState,
} from "../../Recoil/RecoilState";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { baseURL, streamColumns } from "../../utils/StaticVariables";
import useFetchStreams from "../../hooks/useFetchStreams";
import axios from "axios";
import { authState } from "../../Recoil/RecoilState";
import { useSnackbar } from "notistack";
import { useEffect } from "react";

const Streams = () => {
  const { data, loading } = useRecoilValue(streamState);
  const [selectedData, setSelectedStream] = useRecoilState(selectedStreamState);
  const setPopup = useSetRecoilState(popupState);
  const navigate = useNavigate();
  const { refetchStreams } = useFetchStreams(); // Destructure the hook
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    refetchStreams();
    setSelectedStream([]);
  }, [refetchStreams, setSelectedStream]); //

  // ⬇️ Handle checkbox selection
  const changeSelectDataRow = (selectedNewData) => {
    const isInSelectedData = selectedData.some(
      (el) => el.id === selectedNewData.id
    );
    setSelectedStream(
      isInSelectedData
        ? selectedData.filter((el) => el.id !== selectedNewData.id)
        : [...selectedData, selectedNewData]
    );
  };

  const handelDeleteReqFromApi = async () => {
    const selectedIDs = selectedData?.map((el) => el.id);
    try {
      await axios.delete(`${baseURL}source`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          ids: selectedIDs,
        },
      });
      setSelectedStream([]);
      refetchStreams(); //  Refresh list after deletion
      enqueueSnackbar("Stream deleted successfully", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Delete failed " + error?.message, {
        variant: "error",
      });
    }
  };

  const openPopup = () => {
    setPopup({
      isOpen: true,
      title: "Remove Stream",
      content: "Are you sure you want to remove those camera streams?",
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
        <TableReusable
          selected
          handelChangeSelect={changeSelectDataRow}
          showCheckbox
          data={data}
          columns={streamColumns}
          loading={loading}
        />
      </Box>

      <Stack direction="row" justifyContent="space-between" gap={2}>
        <CustomBtn
          disable={selectedData.length < 1}
          color="error"
          isLined
          handle={openPopup}
        >
          Delete
        </CustomBtn>

        <Stack direction="row" gap={2}>
          <CustomBtn
            disable={selectedData.length < 1}
            isLined
            handle={() => navigate("/streams/update-streams")}
          >
            Update
          </CustomBtn>

          <CustomBtn
            disable={selectedData.length < 1}
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
