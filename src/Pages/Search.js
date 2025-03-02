import Holder from "../Components/HOC/Holder"
import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns"
import { useState, useEffect } from "react"
import { dataRenderTypeInSearchArr } from "../utils/StaticVariables"
import CustomChart from "../Components/Reusable/CustomChart"
import axios from "axios"
import { baseURL } from "../utils/StaticVariables"
import CardSearch from "../Components/Search/CardSearch"
import GridContainer from "../Components/HOC/GridContainer"
import SkeletonLoaderReusable from "../Components/Reusable/SkeletonLoaderReusable"
import TableReusable from "../Components/Reusable/TableReusable"
import { searchFramesColumns } from "../utils/StaticVariables"
import FilterSearch from "../Components/Search/FilterSearch"
import { useSetRecoilState } from "recoil";
import { popupState } from "../Recoil/RecoilState";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Stack } from "@mui/system"
import DesBtn from "../Components/Reusable/DesBtn"
import { Pagination } from "@mui/material"
import { Card } from "@mui/material"
import { snackAlertState } from "../Recoil/RecoilState";

const Search = () => {

     const setPopup = useSetRecoilState(popupState);
     const [selectedShowMethod, setSelectedShowMethod] = useState("cards");
     const [searchData, setSearchData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(50);

     const setSnackAlert = useSetRecoilState(snackAlertState);

     const handleToggleChange = (event, newValue) => {
          if (newValue !== null) setSelectedShowMethod(newValue);
     };



     const openPopup = () => {
          setPopup({
               isOpen: true,
               title: " Select Date and Time Range",
               content: <FilterSearch />,
               sendReq: () => { console.log("open ") },
          });
     };


     const handleChangePage = (event, newPage) => {
          setPage(newPage);
          console.log("Current Page:", newPage);
     };

     const handleChangeRowsPerPage = (event) => {
          setLimit(event.target.value)
     };

     const showError = () => {
          setSnackAlert({
              open: true,
              message: "Something went wrong!",
              severity: "error",
          });
      };

     //  get all result
     useEffect(() => {
          setLoading(true)
          window.scrollTo({ top: 0, behavior: "smooth" });
          axios.get(baseURL + "/search_results", {
               params: {
                    page: page - 1,
                    per_page: limit,
                    limit: "12"
               }
          })
               .then(response => {
                    console.log(response.data.data);
                    console.log(response.data.metadata);
                    setSearchData(response.data.data);

               })
               .catch(error => {
                    showError()
                    setSearchData([]);

               }).finally(() => setLoading(false))
     }, [page, limit]);

     return (
          <Holder>

               <Stack direction="row" spacing={2}>
                    <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selectedShowMethod} handleToggleChange={handleToggleChange} />
                    <DesBtn text="Filter" handle={openPopup} customStyle={{ minWidth: "auto" }}> <FilterAltOutlinedIcon /> </DesBtn>
               </Stack>
               {selectedShowMethod === "cards" && (
                    loading ? (
                         <SkeletonLoaderReusable />
                    ) : (
                         <>
                              {!searchData.length ? (
                                   <Card sx={{ p: 3, my: 4, textAlign: "center" }}>
                                        No Data Available in Frame result
                                   </Card>
                              ) : (
                                   <>
                                        <GridContainer items={searchData.map((el) => (
                                             <CardSearch key={el.frame} data={el} />
                                        ))} />
                                        <Stack justifyContent="center" sx={{ mt: 2 }}>
                                             <Pagination
                                                  count={10}
                                                  color="primary"
                                                  sx={{ margin: "auto" }}
                                                  page={page}  // Corrected
                                                  onChange={handleChangePage}
                                             />
                                        </Stack>
                                   </>
                              )}
                         </>
                    )
               )}
               {selectedShowMethod === "table" && <TableReusable
                    data={searchData}
                    columns={searchFramesColumns}
                    loading={loading}
                    page={page}
                    limit={limit}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />}
               {selectedShowMethod === "chart" && <CustomChart />}

          </Holder>
     )
}

export default Search