import { Paper } from "@mui/material"

const Holder = ({ children }) => (

    <Paper sx={{ padding: "1rem" }} elevation={1} >
        {children}
    </Paper>
)

export default Holder