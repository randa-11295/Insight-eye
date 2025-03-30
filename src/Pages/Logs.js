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
      .get("source")
      .then((response) => {
        const res = response.data?.map((el) => ({
          title: el.name,
          val: el.status === "inactive" ? "Off" : "On",
        }));
        //    setStreamData(res);
        console.log("error stream");
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
