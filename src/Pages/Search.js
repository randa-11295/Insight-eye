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
import CustomBtn from "../Components/Reusable/CustomBtn"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Stack } from "@mui/system"
import DesBtn from "../Components/Reusable/DesBtn"
import { Pagination } from "@mui/material"

const Search = () => {

     const setPopup = useSetRecoilState(popupState);
     const [selectedShowMethod, setSelectedShowMethod] = useState("cards");
     const handleToggleChange = (event, newValue) => {
          if (newValue !== null) setSelectedShowMethod(newValue);
     };


     const [searchData, setSearchData] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     //     const setPopup = useSetRecoilState(popupState);

     const openPopup = () => {
          setPopup({
               isOpen: true,
               title: " Select Date and Time Range",
               content: <FilterSearch />,
               sendReq: () => { console.log("open ") },
          });
     };

     const [page, setPage] = useState(1);
     const [limit, setLimit] = useState(50);

     const handleChange = (event, value) => {
          setPage(value);
          console.log("Current Page:", value);
     };




     //  get all result
     useEffect(() => {
          setLoading(true)
          window.scrollTo({ top: 0, behavior: "smooth" });
          axios.get(baseURL + "/search_results", {
               params: {
                    page: page - 1,
                    per_page: limit, 
                    limit : "12"
               }
          })
               .then(response => {
                    console.log(response.data.data);
                    console.log(response.data.metadata);
                    setSearchData(response.data.data);

               })
               .catch(error => {
                    setError(error);
                    setSearchData([]);

               }).finally(() => setLoading(false))
     }, [page, limit]);

     return (
          <Holder>
               <Stack direction="row" spacing={2}>
                    <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selectedShowMethod} handleToggleChange={handleToggleChange} />
                    <DesBtn text={"Filter"} handle={openPopup} customStyle={{ minWidth: "auto" }}> <FilterAltOutlinedIcon /> </DesBtn>
               </Stack>
               {selectedShowMethod === "cards" && (loading ? <SkeletonLoaderReusable /> :
                    <>
                         <GridContainer items={searchData?.map((el) => <CardSearch key={el.frame} data={el} />)} />
                         <Stack justifyContent={"center"}>
                              <Pagination count={10} color="primary" sx={{ margin: "auto" }} value={3} page={page}
                                   onChange={handleChange} />
                         </Stack>
                    </>

               )}
               {selectedShowMethod === "table" && <TableReusable data={searchData} columns={searchFramesColumns} loading={loading} />}
               {selectedShowMethod === "chart" && <CustomChart />}

          </Holder>
     )
}

export default Search