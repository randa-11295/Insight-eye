import Holder from "../Components/HOC/Holder";
import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useAxiosWithAuth } from "../services/api";

import { convertToObjArray } from "../utils/helpers";

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
        // setError(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    getAllLogs();
  }, []);
  return (
    <Holder title={"logs"}>

        this is logs
    </Holder>
  );
};

export default Logs;
