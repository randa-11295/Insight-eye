import { useEffect } from "react"
import { selectedStreamState } from "../../Recoil/RecoilState"
import { useRecoilState } from "recoil";
import { Grid } from "@mui/system";
import StreamCards from "../../Components/Stream/StreamCards";
import Holder from "../../Components/HOC/Holder";
const ShowStreams = () => {
     const [selectedData] = useRecoilState(selectedStreamState);

     useEffect(() => {
          console.log(selectedData)
     }, [selectedData])

     return (
          <Holder>

          <Grid container spacing={2}>
               {selectedData.map(el => <Grid size={ 4} key={el.id}>
                    < StreamCards data={el}/>
               </Grid>)
               }

          </Grid>
          </Holder>
     )
}

export default ShowStreams  