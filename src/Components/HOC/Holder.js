import {  Typography, Stack } from "@mui/material"

const Holder = ({ children, title =" ", action }) => (
<>
<Stack p={3} direction="row" justifyContent="space-between" alignItems="center" >

    {title && <Typography pb={2} fontWeight={800} fontSize={23} textTransform="capitalize">
        {title }
    </Typography>}
    {action}
</Stack>
{children}
</>

)

export default Holder