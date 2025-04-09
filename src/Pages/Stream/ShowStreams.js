import { Grid } from "@mui/material";
import StreamCards from "../../Components/Stream/StreamCards";
import { selectedStreamState } from "../../Recoil/RecoilState";
import { useRecoilState } from "recoil";

const ShowStream = () => {
  const [selectedData] = useRecoilState(selectedStreamState);

  return (
    <Grid container spacing={3}>
      {selectedData.map((el) => (
        <Grid item key={el.id} xs={12} sm={6} md={4} lg={3} my={5}>
          <StreamCards data={el} />{" "}
        </Grid>
      ))}
    </Grid>
  );
};

export default ShowStream;
