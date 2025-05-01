import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns";
import ChartSearch from "../Components/Search/ChartSearch";
import CardSearch from "../Components/Search/CardSearch";
import GridContainer from "../Components/HOC/GridContainer";
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable";
import TableReusable from "../Components/Reusable/TableReusable";
import FilterSearch from "../Components/Search/FilterSearch";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DesBtn from "../Components/Reusable/DesBtn";
import PrintBtn from "../Components/Reusable/PrintBtn";
import { Stack, Card, Pagination, Box, Typography } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { popupState, authState } from "../Recoil/RecoilState";
import { useSnackbar } from "notistack";
import PredictionFilter from "../Components/Prediction/PredictionFilter";

import {
  dataRenderTypeInSearchArr,
  searchFramesColumns,
  baseURL,
} from "../utils/StaticVariables";

const Search = () => {
  const setPopup = useSetRecoilState(popupState);
  const { token } = useRecoilValue(authState);
  const [selectedShowMethod, setSelectedShowMethod] = useState("cards");
  const [searchData, setSearchData] = useState([]);
  const [searchChartData, setSearchChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [total, setTotal] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const childRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) setSelectedShowMethod(newValue);
  };

  useEffect(() => {
    if (!searchData.length) return;

    const chartDataFormat = searchData?.map((el) => ({
      camera_id: el.metadata?.name,
      date: el.metadata?.date || 0,
      time: el.metadata?.time || 0,
      person_count: el.metadata?.person_count || 0,
    }));

    setSearchChartData(chartDataFormat);
  }, [searchData]);

  //*  that make parent submit run
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

  const changePageHandle = (event, newPage) => setPage(newPage);

  useEffect(() => {
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log("Filter", filter);
    axios
      .get(baseURL + "search_results", {
        params: {
          page,
          per_page: "12",
          end_time: filter.endTime,
          start_time: filter.startTime,
          start_date: filter.startDate,
          end_date: filter.endDate,
          camera_id: filter.id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSearchData(response.data.data);
        setNumOfPages(response.data.num_of_pages);
        setTotal(response.data.total_count);
      })
      .catch((error) => {
        setSearchData([]);
        enqueueSnackbar(error.massage || "some thing want wrong", {
          variant: "error",
        });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, filter]);

  return (
    <Box p={2}>
      {!loading && (
        <Stack
          my={4}
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body1" color="textPrimary">
            Available Recoded Frames : <strong> {total || 0}</strong>
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <ReusableToggleBtns
              options={dataRenderTypeInSearchArr}
              value={selectedShowMethod}
              handleToggleChange={handleToggleChange}
            />
            <DesBtn
              text="Filter"
              handle={openPopup}
              customStyle={{ minWidth: "auto" }}
            >
              <FilterAltOutlinedIcon />
            </DesBtn>
            <PrintBtn data={searchData} columns={searchFramesColumns} />
          </Stack>
        </Stack>
      )}

      {selectedShowMethod === "cards" &&
        (loading ? (
          <SkeletonLoaderReusable />
        ) : searchData.length > 0 ? (
          <GridContainer
            items={searchData?.map((el) => (
              <CardSearch key={el.frame} data={el} />
            ))}
          />
        ) : (
          <Card sx={{ p: 3, my: 4, textAlign: "center" }}>
            No Data Available in Frame result
          </Card>
        ))}

      {selectedShowMethod === "table" && (
        <TableReusable
          print
          data={searchData}
          columns={searchFramesColumns}
          loading={loading}
          page={page}
          count={total}
        />
      )}

      {selectedShowMethod === "chart" && (
        <ChartSearch loading={loading} chartData={searchChartData} />
      )}

      {!loading && (
        <Stack justifyContent="center" sx={{ mt: 4 }}>
          <Pagination
            count={numOfPages}
            color="primary"
            sx={{ margin: "auto" }}
            page={page}
            onChange={changePageHandle}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Search;
