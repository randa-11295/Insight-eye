import Holder from "../Components/HOC/Holder"
import CustomChart from "../Components/Reusable/CustomChart"
import { Box } from "@mui/system"
const Dashboard = () => {
    return (
        <>
            < Holder title="chart title">
                <Box sx={{ height: '250px' }}>

                    <CustomChart />
                </Box>
            </Holder>
        </>
    )
}

export default Dashboard 