import { Paper, Typography } from "@mui/material"

const Holder = ({ children, title }) => (

    <Paper sx={{ padding: "1rem", background: "#121212" }} elevation={3} >
        {title && <Typography pb={2} fontWeight={800} fontSize={23} textTransform="capitalize">
            {title}
        </Typography>}
        {children}
    </Paper>
)

export default Holder