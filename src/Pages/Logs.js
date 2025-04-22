import React, { useEffect, useState } from "react";
import { Card, Box, Typography } from "@mui/material";
import { useAxiosWithAuth } from "../services/api";

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const api = useAxiosWithAuth();

  useEffect(() => {
    api
      .get("auth/logs/me")
      .then((res) => setLogs(res.data.logs))
      .catch(console.error);
  }, [api]);

  const formatDate = (iso) => new Date(iso).toLocaleDateString("en-GB"); // DD/MM/YYYY
  const formatTime = (iso) => new Date(iso).toLocaleTimeString("en-GB"); // HH:MM:SS

  return (
    <Box px={2} py={1}>
      {/* Header */}
      <Box display="flex" gap={2}  p={2} flexWrap="wrap" >
        <Typography flex={1}  color="primary" fontWeight="bold">
          Date:
        </Typography>
        <Typography flex={1}  color="primary" fontWeight="bold">
          Time:
        </Typography>
        <Typography flex={2} color="primary"  fontWeight="bold">
          Activity:
        </Typography>
      </Box>

      {/* Rows */}
      {logs.map((log, i) => (
        <Card
          key={log.log_id}
        
         
        
          sx={{
              display: "flex" , 
              gap :2 ,
              p :2,  
            flexDirection: { xs: "column", sm: "row" },
            // only add bottom margin if it's not the last row
            ...(i < logs.length - 1 && { mb: 1 }),
          
            borderRadius: 1,
          }}
        >
          <Typography flex={1} variant="body2" color="grey.100">
            {formatDate(log.created_at)}
          </Typography>
          <Typography flex={1} variant="body2" color="grey.100">
            {formatTime(log.created_at)}
          </Typography>
          <Typography
            flex={2}
            variant="body2"
            color="grey.100"
            sx={{ textTransform: "capitalize" }}
          >
            {log.action_type.replace(/_/g, " ")} {log.content}
          </Typography>
        </Card>
      ))}
    </Box>
  );
}
