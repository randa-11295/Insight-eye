import { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import Holder from "../Components/HOC/Holder";
import HighlightedText from "../Components/Reusable/HighlightedText";
import { useAxiosWithAuth } from "../services/api";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";
import axios from "axios"
import {convertToObjArray} from "../utils/helpers"


const RenderSection = ({ title, data, fullWidth = false }) =>
  data.length > 0 && (
    <Stack
      sx={{
        flex: fullWidth ? "1 1 100%" : "1 1 45%",
      }}
    >
      <Holder title={title}>
        <Stack
          gap={2}
          direction={fullWidth ? "row" : "column"}
          justifyContent={fullWidth ? "space-between" : "flex-start"}
          sx={{ flex: 1 }} // Ensures inner content stretches
        >
          {data.map((item, index) => (
            <HighlightedText
              key={item.id || index}
              title={item.title}
              val={item.val}
            />
          ))}
        </Stack>
      </Holder>
    </Stack>
  );


  const Dashbourd = () => {
  const [streamData, setStreamData] = useState([]);
  const [paramStreamData, setParamStreamData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);
  const [authRecoil] = useRecoilState(authState);
  const api = useAxiosWithAuth();


  const getAllStreams = () => {
    api
      .get("source")
      .then((response) => {
        const res = response.data?.map((el) => ({
          title: el.name,
          val: el.status === "inactive" ? "Off" : "On",
        }));
        setStreamData(res);
      })
      .catch((error) => {
        console.log("error stream");
        console.log(error);
        // setError(error);
        // setLoading(false);
      });
  };

  const getUserInfo = () => {
    api
      .get("user_info")
      .then((response) => {
        const res = convertToObjArray(response.data);
        setPersonalInfo(res);
        // setLoading(false);
      })
      .catch((error) => {
        console.log("error info " ,error);
        // setError(error);
        // setLoading(false);
      });
  };


  const paramStream = () => {
    api
      .get("param_stream/users")
      .then((response) => {
          const res = convertToObjArray(response.data[0]);
        setParamStreamData(res);
        // setLoading(false);
      })
      .catch((error) => {
        console.log("error" ,error);
        // setError(error);
        // setLoading(false);
      });
  };

  useEffect(() => {
    if (authRecoil?.token) {
      getAllStreams();
      paramStream();
      getUserInfo();
    }
  }, [authRecoil]);
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={4}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <RenderSection title="Personal Info" data={personalInfo} />
      <RenderSection title="Camera Status" data={streamData} />
      <RenderSection
        title="System Information"
        data={paramStreamData}
        fullWidth
      />
    </Stack>
  );
};

export default Dashbourd;
