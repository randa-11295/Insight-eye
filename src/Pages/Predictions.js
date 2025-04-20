import { useEffect, useState, useRef } from "react";
import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PredictionsCard from "../Components/Prediction/PredictionsCard";
import useFetchStreams from "../hooks/useFetchStreams";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { streamState, popupState } from "../Recoil/RecoilState";
import PredictionFilter from "../Components/Prediction/PredictionFilter";
import DesBtn from "../Components/Reusable/DesBtn";
import axios from "axios";
import { baseURL } from "../utils/StaticVariables";

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
    setPredictionLoading(true);
    try {
      const { data } = await axios.get(`${baseURL}prediction_data`, {
        params: filterParams,
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setPredictions(data.predictions);
      console.log(data.predictions);
    } catch (err) {
      console.error("Error fetching predictions", err);
      setPredictions([]);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Fetch streams on mount if null
  useEffect(() => {
    console.log(streams);
    if (streams === null) refetchStreams();
  }, [refetchStreams, streams]);

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
        <PredictionFilter ref={childRef} changeFilterHandle={setFilter} />
      ),
      sendReq: handleClick,
    });
  };

  return (
    <>
      <DesBtn
        text="Filter"
        handle={openPopup}
        customStyle={{ minWidth: "auto" }}
      >
        <FilterAltOutlinedIcon />
      </DesBtn>

      {error && <Typography color="error">Something went wrong</Typography>}

      {!loading && streams?.length === 0 && (
        <Typography color="warning.main" textAlign="center" mt={4}>
          You must add at least one camera stream.
        </Typography>
      )}

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {predictionLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {!predictionLoading && predictions.length > 0 && (
        <Grid container spacing={3}>
          {predictions.map((item, index) => (
            <Grid item xs={12} md={6} key={item.camera_id}>
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
