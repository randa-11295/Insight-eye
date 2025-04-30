import { useEffect, useState, useRef } from "react";
import { Box, Grid, Stack, CircularProgress, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PredictionsCard from "../Components/Prediction/PredictionsCard";
import useFetchStreams from "../hooks/useFetchStreams";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { streamState, popupState } from "../Recoil/RecoilState";
import PredictionFilter from "../Components/Prediction/PredictionFilter";
import DesBtn from "../Components/Reusable/DesBtn";
import axios from "axios";
import { baseURL } from "../utils/StaticVariables";
import { convertKeysToKebabCase } from "../utils/helpers";

const Predictions = () => {
  const { refetchStreams } = useFetchStreams();
  const { data: streams, loading, error } = useRecoilValue(streamState);
  const setPopup = useSetRecoilState(popupState);
  const childRef = useRef(null);

  const [filter, setFilter] = useState({});
  const [predictions, setPredictions] = useState([]);
  const [predictionLoading, setPredictionLoading] = useState(false);

  // Fetch predictions from API
  const fetchPredictions = async (filterParams) => {
    console.log("run predictions api ");
    setPredictionLoading(true);
    try {
      const { data } = await axios.get(`${baseURL}prediction_data`, {
        params: convertKeysToKebabCase(filterParams),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setPredictions(data.predictions);
      console.log("api", data.predictions);
    } catch (err) {
      console.error("Error fetching predictions", err);
      setPredictions([]);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Fetch streams on mount if null
  useEffect(() => {
    if (streams === null) {
      console.log("null stream", streams);
      refetchStreams();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streams]);

  // Set default camera_id after streams load
  useEffect(() => {
    if (streams?.length) {
      const allIds = streams.map((s) => s.id).join(",");
      setFilter((prev) => ({ ...prev, camera_id: allIds }));
    }
  }, [streams]);

  // Call predictions API on filter change
  useEffect(() => {
    if (filter.camera_id) {
      fetchPredictions(filter);
    }
  }, [filter]);

  // Submit popup form
  const handleClick = () => {
    if (childRef.current) {
      childRef.current.submit();
    }
  };

  const openPopup = () => {
    setPopup({
      isOpen: true,
      title: "Select Date and Time Range",
      content: (
        <PredictionFilter
          filter={filter}
          ref={childRef}
          changeFilterHandle={setFilter}
        />
      ),
      sendReq: handleClick,
    });
  };

  return (
    <>
      <Stack
        mb={4}
        direction={{ md: "row" }}
        justifyContent="space-between"
        gap={2}
      >
        <Typography>
          Predictions show charts based on the cameras and time you choose
        </Typography>
        <DesBtn
          text="Filter"
          disabled={streams?.length < 0}
          handle={openPopup}
          customStyle={{ minWidth: "auto" }}
        >
          <FilterAltOutlinedIcon />
        </DesBtn>
      </Stack>

      {error && <Typography color="error">Something went wrong</Typography>}

      {!loading && streams?.length === 0 && (
        <Typography color="warning.main" textAlign="center" mt={4}>
          You must add at least one camera stream.
        </Typography>
      )}

      {loading && !predictionLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && predictionLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {!predictionLoading && predictions.length > 0 && (
        <Grid container spacing={3}>
          {predictions.map((item, index) => (
            <Grid item xs={12} sm={6} key={item.camera_id}>
              <PredictionsCard data={item} />
            </Grid>
          ))}
        </Grid>
      )}

      {!predictionLoading && predictions.length === 0 && (
        <Typography textAlign="center" mt={4}>
          No prediction data found.
        </Typography>
      )}
    </>
  );
};

export default Predictions;
