import { Paper, Typography, Stack } from "@mui/material"

const Holder = ({ children, title, action }) => (

    <Paper sx={{ padding: "1rem", background: "#121212" }} elevation={3} >
        <Stack direction="row" justifyContent="space-between" alignItems="center" >

            {title && <Typography pb={2} fontWeight={800} fontSize={23} textTransform="capitalize">
                {title}
            </Typography>}
            {action}
        </Stack>
        {children}
    </Paper>
)

export default Holder