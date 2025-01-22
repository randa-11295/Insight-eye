import { Paper, Typography } from "@mui/material"

const Holder = ({ children }) => (

    <Paper sx={{ padding: "1rem" , background :"#121212"}} elevation={3} >
        <Typography color="primary" pb={2} fontWeight={800 } fontSize={23}>This is Title</Typography>
        {children}
    </Paper>
)

export default Holder