import {  Box , Typography, Stack, Card } from "@mui/material"

const Holder = ({ children, title, action }) => (
<Box  >
<Stack my={3} direction="row" justifyContent={action ?"space-between" : "flex-start"} alignItems="center" >

    {title && <Typography  fontWeight={800} fontSize={21} textTransform="capitalize">
        {title }
    </Typography>}
    {action}
</Stack>
<Card sx={{padding : "20px"}} >
{children}
</Card>
</Box>

)

export default Holder