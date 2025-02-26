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
import { useSetRecoilState } from "recoil";
import { popupState } from "../Recoil/RecoilState";
import CustomBtn from "../Components/Reusable/CustomBtn"
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { Stack } from "@mui/system"
import DesBtn from "../Components/Reusable/DesBtn"
const Search = () => {

     const setPopup = useSetRecoilState(popupState);
     const [selectedShowMethod, setSelectedShowMethod] = useState("cards");
     const handleToggleChange = (event, newValue) => {
          if (newValue !== null) setSelectedShowMethod(newValue);
     };

     const [searchData, setSearchData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     //     const setPopup = useSetRecoilState(popupState);

     const openPopup = () => {
          setPopup({
               isOpen: true,
               title: "Remove Stream",
               content: "Are you sure?",
               sendReq: () => { console.log("open ") },
          });
     };



     const getAllSearchResult = () => {
          axios.get(baseURL + "/search_results")
               .then(response => {
                    console.log(response.data.data);
                    console.log(response.data.metadata);
                    setSearchData(response.data.data);
                    setLoading(false);
               })
               .catch(error => {
                    setError(error);
                    setLoading(false);
               });
     };

     useEffect(() => {
          getAllSearchResult();
     }, []);

     return (
          <Holder>
               <Stack direction="row" spacing={2}>

                    <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selectedShowMethod} handleToggleChange={handleToggleChange} />
                 <DesBtn text={"Filter"} handle={openPopup} customStyle={{ minWidth: "auto" }}> <FilterAltOutlinedIcon /> </DesBtn>

               </Stack>
               {selectedShowMethod === "cards" && (loading ? <SkeletonLoaderReusable /> : <GridContainer items={searchData?.map((el) => <CardSearch key={el.frame} data={el} />)} />)}
               {selectedShowMethod === "table" && <TableReusable data={searchData} columns={searchFramesColumns} loading={loading} />}
               {selectedShowMethod === "chart" && <CustomChart />}

          </Holder>
     )
}

export default Search