import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns";
import ChartSearch from "../Components/Search/ChartSearch";
import CardSearch from "../Components/Search/CardSearch";
import GridContainer from "../Components/HOC/GridContainer";
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable";
import TableReusable from "../Components/Reusable/TableReusable";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import DesBtn from "../Components/Reusable/DesBtn";
import PrintBtn from "../Components/Reusable/PrintBtn";
import { Stack, Card, Pagination, Box, Typography } from "@mui/material";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { popupState, authState } from "../Recoil/RecoilState";
import { useSnackbar } from "notistack";
import PredictionFilter from "../Components/PopUp/Filter";

import {
  dataRenderTypeInSearchArr,
  searchFramesColumns,
  baseURL,
} from "../utils/StaticVariables";

const Search = () => {
  const setPopup = useSetRecoilState(popupState);
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();

  // display mode
  const [selectedShowMethod, setSelectedShowMethod] = useState("cards");

  // paginated data + meta
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(18);
  const [total, setTotal] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);

  // full data for download/chart
  const [allData, setAllData] = useState([]);
  const [allChartData, setAllChartData] = useState([]);

  // filter & loading
  const [filter, setFilter] = useState({});
  const [loading, setLoading] = useState(true);

  const childRef = useRef(null);

  // toggle between cards/table/chart
  const handleToggleChange = (e, val) => {
    if (!val) return;
    setSelectedShowMethod(val);
    if (val === "chart") {
      // ensure paginated view will fetch _all_ so pagination disappears
      setPage(1);
      setLimit(total);
    } else {
      setLimit(18);
    }
  };

  // open your filter pop-up
  const handleClick = () => childRef.current?.submit();
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

  // when page/filter/limit change, fetch paginated + full
  useEffect(() => {
    const paramsBase = {
      end_time: filter.endTime,
      start_time: filter.startTime,
      start_date: filter.startDate,
      end_date: filter.endDate,
      camera_id: filter.camera_id,
    };

    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    // 1️⃣ paginated
    axios
      .get(baseURL + "search_results", {
        params: { page, per_page: limit, ...paramsBase },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setSearchData(data.data);
        setNumOfPages(data.num_of_pages);
        setTotal(data.total_count);

        // 2️⃣ full fetch for charts/download
        return axios.get(baseURL + "search_results", {
          params: { page: 1, per_page: data.total_count, ...paramsBase },
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(({ data }) => {
        setAllData(data.data);
        // derive chart dataset
        const chartFmt = data.data.map((el) => ({
          camera_id: el.metadata?.name,
          date: el.metadata?.date || 0,
          time: el.metadata?.time || 0,
          person_count: el.metadata?.person_count || 0,
        }));
        setAllChartData(chartFmt);
      })
      .catch((err) => {
        enqueueSnackbar(err.message || "Something went wrong", {
          variant: "error",
        });
        // clear on error
        setSearchData([]);
        setAllData([]);
      })
      .finally(() => setLoading(false));

    // disable exhaustive-deps warning for token/filter/page/limit
  }, [page, filter, limit]);

  return (
    <Box p={2}>
      {/* Info & Controls */}
      {!loading && (
        <Stack my={4} spacing={2}>
          <Typography variant="body1" textAlign={{ xs: "center", md: "left" }}>
            Available Recorded Frames: <strong>{total}</strong>
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box flex={1}>
              <ReusableToggleBtns
                options={dataRenderTypeInSearchArr}
                value={selectedShowMethod}
                handleToggleChange={handleToggleChange}
              />
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center">
              <DesBtn text="Filter" handle={openPopup}>
                <FilterAltOutlinedIcon />
              </DesBtn>
              {/* always pass full data for download */}
              <PrintBtn data={allData} columns={searchFramesColumns} />
            </Stack>
          </Stack>
        </Stack>
      )}

      {/* CARD VIEW */}
      {selectedShowMethod === "cards" &&
        (loading ? (
          <SkeletonLoaderReusable />
        ) : searchData.length > 0 ? (
          <GridContainer
            items={searchData.map((el) => (
              <CardSearch key={el.frame} data={el} />
            ))}
          />
        ) : (
          <Card sx={{ p: 3, my: 4, textAlign: "center" }}>
            No Data Available
          </Card>
        ))}

      {/* TABLE VIEW */}
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

      {/* CHART VIEW (uses full dataset) */}
      {selectedShowMethod === "chart" && (
        <ChartSearch loading={loading} chartData={allChartData} />
      )}

      {/* PAGINATION (hide when chart mode has taken over with limit=total) */}
      {!loading && numOfPages > 1 && selectedShowMethod !== "chart" && (
        <Stack justifyContent="center" sx={{ mt: 4 }}>
          <Pagination
            count={numOfPages}
            page={page}
            onChange={(e, p) => setPage(p)}
          />
        </Stack>
      )}
    </Box>
  );
};

export default Search;
