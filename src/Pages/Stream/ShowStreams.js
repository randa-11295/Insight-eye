import { Grid } from "@mui/material";
import StreamCards from "../../Components/Cards/StreamCards";
import { selectedStreamState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const ShowStream = () => {
  const [selectedData] = useRecoilState(selectedStreamState);
  
useEffect(()=>{
console.log(selectedData)
},[selectedData])

  return (
    <Grid container spacing={3}>
      {selectedData.map((el) => (
        <Grid item key={el.id} xs={12} sm={6}  lg={4} my={5}>
          <StreamCards data={el} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowStream;
