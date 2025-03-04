import { useState, useEffect, useRef } from "react";
import Holder from "../Components/HOC/Holder";
import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns";
import { dataRenderTypeInSearchArr, searchFramesColumns, baseURL } from "../utils/StaticVariables";
import CustomChart from "../Components/Search/searchChart";
import axios from "axios";
import CardSearch from "../Components/Search/CardSearch";
import GridContainer from "../Components/HOC/GridContainer";
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable";
import TableReusable from "../Components/Reusable/TableReusable";
import FilterSearch from "../Components/Search/FilterSearch";
import { useSetRecoilState } from "recoil";
import { popupState, snackAlertState } from "../Recoil/RecoilState";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Stack, Card, Pagination } from "@mui/material";
import DesBtn from "../Components/Reusable/DesBtn";

const Search = () => {
  const setPopup = useSetRecoilState(popupState);
  const setSnackAlert = useSetRecoilState(snackAlertState);
  const [selectedShowMethod, setSelectedShowMethod] = useState("cards");
  const [searchData, setSearchData] = useState([]);
  const [searchChartData, setSearchChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  const [total, setTotal] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);

  const childRef = useRef(null); // Ensure it's null initially

  const handleToggleChange = (event, newValue) => {
    if (newValue !== null) setSelectedShowMethod(newValue);
  };

  useEffect(() => {
    if (!searchData.length) return;

    const chartDataFormat = searchData.map(el => ({
      camera_id: el.metadata?.camera_id,
      date: el.metadata?.date || 0,
      time: el.metadata?.time || 0,
      person_count: el.metadata?.person_count || 0,
    }));

    setSearchChartData(chartDataFormat);
  }, [searchData]);

  const handleClick = () => {
    console.log("tessst");
    if (childRef.current) {
      childRef.current.submit(); // Call child's function
    }
  };

  const openPopup = () => {
    setPopup({
      isOpen: true,
      title: "Select Date and Time Range",
      content: <FilterSearch ref={childRef} />, // Attach ref here
      sendReq: handleClick,
    });
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const showError = () => setSnackAlert({ open: true, message: "Something went wrong!", severity: "error" });

  useEffect(() => {

    setLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    console.log(filter)
    axios.get(`${baseURL}/search_results`, { params: { page, per_page: 50 } })
      .then(response => {
        setSearchData(response.data.data);
        setNumOfPages(response.data.num_of_pages);
        setTotal(response.data.total_count);
      })
      .catch(showError)
      .finally(() => setLoading(false));
  }, [page, filter]);

  return (
    <Holder>
      <Stack direction="row" spacing={2}>
        <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selectedShowMethod} handleToggleChange={handleToggleChange} />
        <DesBtn text="Filter" handle={openPopup} customStyle={{ minWidth: "auto" }}>
          <FilterAltOutlinedIcon />
        </DesBtn>
      </Stack>
      <p>Total: {total || 0}</p>

      {selectedShowMethod === "cards" && (loading ? <SkeletonLoaderReusable /> : (
        searchData.length ? (
          <>
            <GridContainer items={searchData.map(el => <CardSearch key={el.frame} data={el} />)} />
            <Stack justifyContent="center" sx={{ mt: 2 }}>
              <Pagination count={numOfPages} color="primary" sx={{ margin: "auto" }} page={page} onChange={handleChangePage} />
            </Stack>
          </>
        ) : <Card sx={{ p: 3, my: 4, textAlign: "center" }}>No Data Available in Frame result</Card>
      ))}

      {selectedShowMethod === "table" && (
        <TableReusable
          data={searchData}
          columns={searchFramesColumns}
          loading={loading}
          page={page}
          count={total}
          onPageChange={handleChangePage}
        />
      )}

      {selectedShowMethod === "chart" && <CustomChart chartData={searchChartData} />}
    </Holder>
  );
};

export default Search;
