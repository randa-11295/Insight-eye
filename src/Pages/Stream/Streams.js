import { useEffect } from "react";
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
import useFetchStreams from "../../hooks/useFetchStreams"; // ✅ use your hook
import axios from "axios";
import { authState } from "../../Recoil/RecoilState";

const Streams = () => {
  const { data, loading } = useRecoilValue(streamState);
  const setStream = useSetRecoilState(streamState);
  const [selectedData, setSelectedStream] = useRecoilState(selectedStreamState);
  const setPopup = useSetRecoilState(popupState);
  const navigate = useNavigate();
  const { refetchStreams } = useFetchStreams(); // Destructure the hook
  const { token } = useRecoilValue(authState);
  //  Refetch if there's no data loaded
  useEffect(() => {
    if (data === null) {
      refetchStreams();
    }
  }, [data, refetchStreams]);

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

  // ⬇ Delete selected streams
  const handelDeleteReqFromApi = async () => {
    const selectedIDs = selectedData?.map((el) => el.id);
    setStream((prev) => ({ ...prev, loading: true }));

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
    } catch (error) {
      console.error("Delete Error:", error);
    } finally {
      setStream((prev) => ({ ...prev, loading: false }));
    }
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
