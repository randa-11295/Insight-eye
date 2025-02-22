import Holder from "../Components/HOC/Holder"
import ReusableToggleBtns from "../Components/Reusable/ReusableToggleBtns"
import ReusableAccordion from "../Components/Reusable/ReusableAccordion"
import { useState } from "react"
import { dataRenderTypeInSearchArr } from "../utils/StaticVariables"
import CustomChart from "../Components/Reusable/CustomChart"
import { Box } from "@mui/system"
const Search = () => {
     const [selected, setSelected] = useState("table");

     const handleToggleChange = (event, newValue) => {
          if (newValue !== null) setSelected(newValue);
     };


     return (
          <Holder>
               <ReusableToggleBtns options={dataRenderTypeInSearchArr} value={selected} onChange={handleToggleChange} />
               <ReusableAccordion />


               <CustomChart />

               <p>table</p>
          </Holder>
     )
}

export default Search