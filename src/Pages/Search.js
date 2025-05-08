import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Box, Stack, Typography, Card, Pagination } from "@mui/material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useSnackbar } from "notistack";

import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns";
import ChartSearch from "../Components/Search/ChartSearch";
import CardSearch from "../Components/Search/CardSearch";
import GridContainer from "../Components/HOC/GridContainer";
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable";
import TableReusable from "../Components/Reusable/TableReusable";
import DesBtn from "../Components/Reusable/DesBtn";
import PrintBtn from "../Components/Reusable/PrintBtn";
import PredictionFilter from "../Components/PopUp/Filter";

import {
  dataRenderTypeInSearchArr,
  searchFramesColumns,
  baseURL,
} from "../utils/StaticVariables";
import { popupState, authState } from "../Recoil/RecoilState";

// --- Helper to build axios params from filter + pagination ---
const buildParams = ({ filter, page, limit }) => ({
  ...filter,
  end_time: filter.endTime,
  start_time: filter.startTime,
  start_date: filter.startDate,
  end_date: filter.endDate,
  camera_id: filter.camera_id,
  page,
  per_page: limit,
});

// --- Custom hook encapsulating all data fetching + state ---
function useSearchResults({ filter, page, limit, token }) {
  const [paginated, setPaginated] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetcher = useCallback(async () => {
    setLoading(true);
    const params = buildParams({ filter, page, limit });

    try {
      // 1️⃣ paginated fetch
      const { data: pageRes } = await axios.get(`${baseURL}search_results`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });
      const { data: pageData, total_count, num_of_pages } = pageRes;
      setPaginated(pageData);
      setTotal(total_count);
      setPages(num_of_pages);

      // 2️⃣ full fetch for chart & download
      const { data: fullRes } = await axios.get(`${baseURL}search_results`, {
        params: { ...params, page: 1, per_page: total_count },
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllData(fullRes.data);

      // 3️⃣ derive chart payload
      setChartData(
        fullRes.data.map((el) => ({
          camera_id: el.metadata?.name,
          date: el.metadata?.date || 0,
          time: el.metadata?.time || 0,
          person_count: el.metadata?.person_count || 0,
        }))
      );
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  }, [filter, page, limit, token]);

  useEffect(() => {
    fetcher().catch(() => {}); // let caller handle errors
  }, [fetcher]);

  return { paginated, allData, chartData, total, pages, loading };
}

export default function Search() {
  const setPopup = useSetRecoilState(popupState);
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();
  const childRef = useRef(null);

  // UI state
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(18);
  const [viewMode, setViewMode] = useState("cards");

  // fetch data
  const { paginated, allData, chartData, total, pages, loading } =
    useSearchResults({ filter, page, limit, token });

  // handle toggle between views
  const onViewChange = (_, mode) => {
    if (!mode) return;
    setViewMode(mode);
  };

  // open filter dialog
  const openFilter = () => {
    setPopup({
      isOpen: true,
      title: "Select Date and Time Range",
      content: (
        <PredictionFilter
          ref={childRef}
          filter={filter}
          changeFilterHandle={setFilter}
        />
      ),
      sendReq: () => childRef.current?.submit(),
    });
  };

  // catch and show errors from hook
  useEffect(() => {
    if (!loading && paginated.length === 0 && total !== 0) {
      enqueueSnackbar("No results found", { variant: "warning" });
    }
  }, [loading, paginated, total, enqueueSnackbar]);

  return (
    <Box p={2}>
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
                value={viewMode}
                handleToggleChange={onViewChange}
              />
            </Box>

            <Stack direction="row" spacing={2}>
              <DesBtn text="Filter" handle={openFilter}>
                <FilterAltOutlinedIcon />
              </DesBtn>
              <PrintBtn data={allData} columns={searchFramesColumns} />
            </Stack>
          </Stack>
        </Stack>
      )}

      {viewMode === "cards" &&
        (loading ? (
          <SkeletonLoaderReusable />
        ) : paginated.length ? (
          <GridContainer
            items={paginated.map((el) => (
              <CardSearch key={el.frame} data={el} />
            ))}
          />
        ) : (
          <Card sx={{ p: 3, my: 4, textAlign: "center" }}>
            No Data Available
          </Card>
        ))}

      {viewMode === "table" && (
        <TableReusable
          print
          data={paginated}
          columns={searchFramesColumns}
          loading={loading}
          page={page}
          count={total}
        />
      )}

      {viewMode === "chart" && (
        <ChartSearch loading={loading} chartData={chartData} />
      )}

      {!loading && pages > 1 && viewMode !== "chart" && (
        <Stack justifyContent="center" sx={{ mt: 4 }}>
          <Pagination
            count={pages}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </Stack>
      )}
    </Box>
  );
}
