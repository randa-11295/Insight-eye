import { useEffect } from "react"
import { selectedStreamState } from "../../Recoil/RecoilState"
import { useRecoilState } from "recoil";
import { Grid } from "@mui/system";
import StreamCards from "../../Components/Stream/StreamCards";
import Holder from "../../Components/HOC/Holder";
import { baseURL } from "../../utils/StaticVariables";
import axios from "axios";

const ShowStreams = () => {
     const [selectedData] = useRecoilState(selectedStreamState);

     useEffect(() => {
          // console.log(selectedData)
          axios.get(baseURL + "/video_stream/a2ad70bd-9f7c-42da-8553-a5bc6d66c766")
          .then(response => {
              console.log(response.data);
             
          })
          .catch(error => {
          
          });
     }, [])

     return (
          <Holder>

          <Grid container spacing={2}>
               {selectedData?.map(el => <Grid size={ 4} key={el.id}>
                    < StreamCards data={el}/>
               </Grid>)
               }

          </Grid>
          </Holder>
     )
}

export default ShowStreams  