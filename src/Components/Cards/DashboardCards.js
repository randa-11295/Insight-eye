//import React, { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import Holder from "../../Components/HOC/Holder";
import HighlightedText from "../../Components/Reusable/HighlightedText";

//  Reusable section displaying a title, loader, error or list of items
const DashboardCards = ({ title, data, fullWidth = false, loading, error }) => {


   return  <Stack sx={{ flex: (fullWidth ? "1 1 100%" : "1 1 45%") ,  }}>
       <Holder title={title}>
         {loading ? (
           <Stack justifyContent="center" alignItems="center" minHeight={80}>
             <CircularProgress size={24} />
           </Stack>
         ) : error ? (
           <Typography color="error" variant="body2">
             {error}
           </Typography>
         ) : (
           <Stack
             gap={2}
             direction={fullWidth ? "row" : "column"}
             flexWrap={"wrap"}
             justifyContent={fullWidth ? "space-between" : "flex-start"}
           >
             {data?.map((item, idx) => (
               <HighlightedText
                 key={item.id ?? idx}
                 title={item.title}
                 val={item.val}
               />
             ))}
           </Stack>
         )}
       </Holder>
     </Stack>
   };


   export default DashboardCards