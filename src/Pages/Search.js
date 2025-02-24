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
const Search = () => {
     const [selectedShowMethod, setSelectedShowMethod] = useState("cards");

     const handleToggleChange = (event, newValue) => {
          if (newValue !== null) setSelectedShowMethod(newValue);
     };

     const [searchData, setSearchData] = useState(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     //     const setPopup = useSetRecoilState(popupState);

     const columns = [
          { field: "camera_id", headerName: "Camera ID" },
          { field: "date", headerName: "Date" },
          { field: "time", headerName: "Time" },
          { field: "person_count", headerName: "Person Count" },
          { field: "frame", headerName: "Image" }
        ];
        
     const getAllSearchResult = () => {
          axios.get(baseURL + "/search_results")
               .then(response => {
                    console.log(response.data.data);
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
               <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selectedShowMethod} onChange={handleToggleChange} />
               {selectedShowMethod === "cards" && <div>
                    {loading ? <SkeletonLoaderReusable  /> : <GridContainer items={searchData?.map((el) => <CardSearch key={el.frame} data={el} />)} />}


               </div>

               }
               {selectedShowMethod === "table" &&   <TableReusable data={searchData} columns={columns} loading={loading} />   }
    
               {selectedShowMethod === "chart" && <CustomChart />}
          </Holder>
     )
}

export default Search