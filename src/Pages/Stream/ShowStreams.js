import { Grid } from "@mui/material";
import StreamCards from "../../Components/Stream/StreamCards";
import { selectedStreamState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";
import ParamStream from "../../Components/Stream/PramStream";
const ShowStream = () => {
  const [selectedData] = useRecoilState(selectedStreamState);

  return (
    <>
      <ParamStream />
      <Grid container spacing={2}  mt={2}>
        {selectedData?.map((el) => (
          <Grid item key={el.id} xs={12} sm={6} lg={4} >
            <StreamCards data={el} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ShowStream;
