import {  Typography, Stack } from "@mui/material"

const Holder = ({ children, title, action }) => (
<>
<Stack py={2} direction="row" justifyContent="space-between" alignItems="center" >

    {title && <Typography  fontWeight={800} fontSize={21} textTransform="capitalize">
        {title }
    </Typography>}
    {action}
</Stack>
{children}
</>

)

export default Holder