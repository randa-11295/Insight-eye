import { useEffect, useState, useRef } from "react";
import { Box, Grid, Stack, Card, Typography } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PredictionsCard from "../Components/Prediction/PredictionsCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { streamState, popupState } from "../Recoil/RecoilState";
import Filter from "../Components/PopUp/Filter";
import DesBtn from "../Components/Reusable/DesBtn";
import axios from "axios";
import { baseURL } from "../utils/StaticVariables";
import { convertKeysToKebabCase } from "../utils/helpers";
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable";

const Predictions = () => {
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
        params: convertKeysToKebabCase(filterParams),
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      setPredictions(data?.predictions || []);
    } catch (err) {
      console.error("Error fetching predictions", err);
      setPredictions([]);
    } finally {
      setPredictionLoading(false);
    }
  };

  // Set default camera_id after streams load
  useEffect(() => {
    if (streams) {
      const allIds = streams?.map((s) => s.id).join(",");
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
        <Filter
          filter={filter}
          ref={childRef}
          changeFilterHandle={setFilter}
        />
      ),
      sendReq: handleClick,
    });
  };

  // Centralized render state logic
  let renderState = "loading";

  if (error && !loading) {
    renderState = "error";
  } else if (!loading && streams?.length === 0) {
    renderState = "noStreams";
  } else if (!predictionLoading && predictions?.length === 0) {
    renderState = "noData";
  } else if (!predictionLoading && predictions?.length > 0) {
    renderState = "data";
  }

  return (
    <>
      <Stack
        mb={4}
        direction="row"
        justifyContent="space-between"
        alignItems="start"
        gap={2}
      >
        <Typography sx={{ flexGrow: 1, fontSize: "1.2rem" }}>
          Predictions show charts based on the cameras and time you choose
        </Typography>
        <DesBtn
          text="Filter"
          disabled={!streams?.length}
          handle={openPopup}
          customStyle={{ minWidth: "auto" }}
        >
          <FilterAltOutlinedIcon />
        </DesBtn>
      </Stack>

      {renderState === "loading" && (
        <Box display="flex" justifyContent="center" my={4}>
          <SkeletonLoaderReusable />
        </Box>
      )}

      {renderState === "error" && (
        <Typography color="error">Something went wrong</Typography>
      )}

      {renderState === "noStreams" && (
        <Typography color="warning.main" textAlign="center" mt={4}>
          You must add at least one camera stream.
        </Typography>
      )}

      {renderState === "noData" && (
        <Card sx={{ p: 3, my: 4, textAlign: "center" }}>
          No prediction data found.
        </Card>
      )}

      {renderState === "data" && (
        <Grid container spacing={3}>
          {predictions.map((item) => (
            <Grid item xs={12} sm={6} key={item.camera_id}>
              <PredictionsCard data={item} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default Predictions;
