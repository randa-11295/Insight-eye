import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Typography,
} from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import PredictionsCard from "../Components/Prediction/PredictionsCard";
import useFetchStreams from "../hooks/useFetchStreams";
import { useRecoilValue } from "recoil";
import { streamState } from "../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import { popupState } from "../Recoil/RecoilState";
import PredictionFilter from "../Components/Prediction/PredictionFilter";
import { useRef } from "react";
import DesBtn from "../Components/Reusable/DesBtn";

const StreamSelector = ({ streams, selectedIds, onToggle, loading }) => (
  <Grid container spacing={2} sx={{ mb: 3 }}>
    {streams?.map((stream) => (
      <Grid item xs={12} sm={6} md={4} key={stream.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedIds.includes(stream.id)}
              onChange={() => onToggle(stream.id)}
              disabled={loading}
              sx={{
                "&.Mui-checked": {
                  color: "primary.main",
                },
              }}
            />
          }
          label={stream.name}
        />
      </Grid>
    ))}
  </Grid>
);

const Predictions = () => {
  const { refetchStreams } = useFetchStreams(); // Auto fetch
  const { data: streams, loading, error } = useRecoilValue(streamState);

  const [selectedIds, setSelected] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  useEffect(() => {
    console.log("streams", streams);
    if (streams === null) refetchStreams();
  }, [refetchStreams, streams]);

  // 🔁 Auto-select all stream IDs once data loads
  useEffect(() => {
    if (streams?.length) {
      setSelected(streams?.map((s) => s.id));
    }
  }, [streams]);

  const handleToggle = (id) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const setPopup = useSetRecoilState(popupState);

  const childRef = useRef(null);

  //*  that make parent submit run
  const handleClick = () => {
    console.log("run api");
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
          ref={childRef}
          changeFilterHandle={setFilter}
          // total={total}
        />
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

      <StreamSelector
        streams={streams}
        selectedIds={selectedIds}
        onToggle={handleToggle}
        loading={loading}
      />

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {!loading && (
        <Grid container spacing={3}>
          {selectedIds?.map((id) => {
            const stream = streams.find((s) => s.id === id);
            return (
              <Grid item xs={12} md={6} key={id}>
                <PredictionsCard streamId={id} streamName={stream?.name} />
              </Grid>
            );
          })}

          {selectedIds?.length === 0 && (
            <Grid item xs={12}>
              <Typography variant="body2" fontStyle="italic" textAlign="center">
                Select at least one camera to see its predictions.
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default Predictions;
