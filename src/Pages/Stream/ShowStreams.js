import { Grid } from "@mui/material";
import StreamCards from "../../Components/Stream/StreamCards";
import { selectedStreamState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import ParamStream from "../../Components/Stream/PramStream";
import { useEffect } from "react";

const ShowStream = () => {
  const [selectedData] = useRecoilState(selectedStreamState);

  useEffect(() => {
    console.log("Selected Data:", selectedData);
  }, [selectedData]);
  return (
    <div>
      <ParamStream />
      <Grid container spacing={2}  mt={2}>
        {selectedData?.map((el) => (
          <Grid item key={el.id} xs={12} sm={6} lg={4} >
            <StreamCards data={el} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ShowStream;
