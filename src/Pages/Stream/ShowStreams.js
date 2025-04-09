import { Box } from "@mui/material";
import StreamCards from "../../Components/Stream/StreamCards";
import { selectedStreamState } from "../../Recoil/RecoilState"
import { useRecoilState } from "recoil";
import {useEffect}  from "react"

const ShowStream = () => {
  const [selectedData] = useRecoilState(selectedStreamState);

  useEffect(()=>{
    console.log(selectedData)
  },[selectedData])

  return (
 
    
      <Box sx={{  py: 2 }}>
        {selectedData.map(el=>  <StreamCards data={el} /> )}
       
      </Box>
 
  );
};

export default ShowStream;
