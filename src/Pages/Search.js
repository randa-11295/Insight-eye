import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import {
  Box,
  Stack,
  Typography,
  Card,
  Pagination,
} from "@mui/material";
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

export default function Search() {
  const setPopup = useSetRecoilState(popupState);
  const { token } = useRecoilValue(authState);
  const { enqueueSnackbar } = useSnackbar();
  const childRef = useRef(null);

  // UI state
  const [filter, setFilter] = useState({});
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [viewMode, setViewMode] = useState("cards");

  // Data states
  const [paginated, setPaginated] = useState([]);
  const [allData, setAllData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true); // For paginated
  const [allDataLoading, setAllDataLoading] = useState(true); // For full data (download/chart)

  // --- Fetching Logic ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    setAllDataLoading(true);

    const params = buildParams({ filter, page, limit });

    try {
      // 1️⃣ Fetch paginated data
      const { data: pageRes } = await axios.get(`${baseURL}search_results`, {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: pageData, total_count, num_of_pages } = pageRes;
      setPaginated(pageData);
      setTotal(total_count);
      setPages(num_of_pages);
      setLoading(false); // paginated fetch complete

      // 2️⃣ Fetch all data for chart and download
      const { data: fullRes } = await axios.get(`${baseURL}search_results`, {
        params: { ...params, page: 1, per_page: total_count },
        headers: { Authorization: `Bearer ${token}` },
      });

      setAllData(fullRes.data);

      // 3️⃣ Prepare chart data
      setChartData(
        fullRes.data.map((el) => ({
          camera_id: el.metadata?.name,
          date: el.metadata?.date || 0,
          time: el.metadata?.time || 0,
          person_count: el.metadata?.person_count || 0,
        }))
      );
    } catch (err) {
      enqueueSnackbar("Failed to fetch data", { variant: "error" });
    } finally {
      setAllDataLoading(false); // full data fetch complete
    }
  }, [filter, page, limit, token, enqueueSnackbar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // 🔁 View toggle
  const onViewChange = (_, mode) => {
    if (mode) setViewMode(mode);
  };

  // 🧭 Open filter popup
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

  // ⚠️ Notify when no results
  useEffect(() => {
    if (!loading && paginated.length === 0 && total !== 0) {
      enqueueSnackbar("No results found", { variant: "warning" });
    }
  }, [loading, paginated, total, enqueueSnackbar]);

  return (
    <Box>
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

              {/* ✅ Only show PrintBtn when allData is fully loaded */}
              {!allDataLoading && (
                <PrintBtn data={allData} columns={searchFramesColumns} />
              )}
            </Stack>
          </Stack>
        </Stack>
      )}

      {/* 🔳 Cards View */}
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

      {/* 🧾 Table View */}
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

      {/* 📊 Chart View */}
      {viewMode === "chart" && (
        <ChartSearch loading={loading} chartData={chartData} />
      )}

      {/* 📄 Pagination (skip on chart) */}
      {!loading && pages > 1 && viewMode !== "chart" && (
        <Stack justifyContent="center" sx={{ mt: 4 }}>
          <Pagination count={pages} page={page} onChange={(_, p) => setPage(p)} />
        </Stack>
      )}
    </Box>
  );
}
