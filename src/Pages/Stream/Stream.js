import Holder from "../../Components/HOC/Holder"
import { Box } from "@mui/system"
import CustomBtn from "../../Components/Reusable/CustomBtn"
const Stream = () => {
    return (
        <>
            < Holder title="all streams" action={<CustomBtn text="Add New Stream" handle={() => { console.log("this is fun") }} />} >
                <Box sx={{ height: '250px' }}>

                    test                </Box>
            </Holder>
        </>
    )
}

export default Stream 