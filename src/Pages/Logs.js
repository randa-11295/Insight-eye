import Holder from "../Components/HOC/Holder";
import { useEffect, useState } from "react";
import { useAxiosWithAuth } from "../services/api";
import {
  Card,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
  Stack,
} from "@mui/material";

const Logs = () => {
  const [logsData, setLogsData] = useState([]);
  const api = useAxiosWithAuth();

  const getAllLogs = () => {
    api
      .get("auth/logs/me")
      .then((response) => {
        setLogsData(response.data.logs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  return (
    <Stack spacing={2}>
      {logsData.map((log) => (
        <Card key={log.log_id} sx={{ borderRadius: 3, boxShadow: 3 }}>
          {/* Card Header with Avatar, Username, and Status on Right */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.main" }}>
                {log.username.charAt(0).toUpperCase()}
              </Avatar>
            }
            title={log.username}
            subheader={new Date(log.created_at).toLocaleString()}
            action={
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                  color: log.status === "success" ? "green" : "red",
                  pr: 2, // Padding to keep it aligned properly
                }}
              >
                {log.status.toUpperCase()}
              </Typography>
            }
          />

          <CardContent>
            {/* Post Content */}
            <Typography variant="body2"  sx={{ textTransform: "capitalize"  ,color : "secondary.main"}}>
              {log.action_type.replace("_", " ")}
            </Typography>
            <Typography pt={1} variant="h6">{log.content}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default Logs;
