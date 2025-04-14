import { useEffect, useState } from "react";
import { Stack, Typography, CircularProgress } from "@mui/material";
import Holder from "../Components/HOC/Holder";
import HighlightedText from "../Components/Reusable/HighlightedText";
import { useRecoilState } from "recoil";
import { authState } from "../Recoil/RecoilState";
import axios from "axios";
import { convertToObjArray } from "../utils/helpers";
import { baseURL } from "../utils/StaticVariables";

// Reusable Section Renderer
const RenderSection = ({ title, data, fullWidth = false, loading, error }) => (
  <Stack sx={{ flex: fullWidth ? "1 1 100%" : "1 1 45%" }}>
    <Holder title={title}>
      {loading ? (
        <Stack alignItems="center" justifyContent="center" minHeight="80px">
          <CircularProgress size={24} />
        </Stack>
      ) : error ? (
        <Typography color="error" fontSize="0.9rem">
          {error}
        </Typography>
      ) : (
        <Stack
          gap={2}
          direction={fullWidth ? "row" : "column"}
          justifyContent={fullWidth ? "space-between" : "flex-start"}
          sx={{ flex: 1 }}
        >
          {data.map((item, index) => (
            <HighlightedText
              key={item.id || index}
              title={item.title}
              val={item.val}
            />
          ))}
        </Stack>
      )}
    </Holder>
  </Stack>
);

// Dashboard Component
const Dashboard = () => {
  const [streamData, setStreamData] = useState([]);
  const [paramStreamData, setParamStreamData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState([]);

  const [streamLoading, setStreamLoading] = useState(true);
  const [paramLoading, setParamLoading] = useState(true);
  const [infoLoading, setInfoLoading] = useState(true);

  const [streamError, setStreamError] = useState(null);
  const [paramError, setParamError] = useState(null);
  const [infoError, setInfoError] = useState(null);

  const [authRecoil] = useRecoilState(authState);

  // Get all streams
  const getAllStreams = () => {
    setStreamLoading(true);
    axios
      .get(`${baseURL}source`, {
        headers: { Authorization: `Bearer ${authRecoil.token}` },
      })
      .then((response) => {
        const res = response.data?.map((el) => ({
          title: el.name,
          val: el.status === "inactive" ? "Off" : "On",
        }));
        setStreamData(res);
        setStreamError(null);
      })
      .catch((error) => {
        setStreamError("Failed to load camera status");
        console.error("Error fetching stream data:", error);
      })
      .finally(() => setStreamLoading(false));
  };

  // Get user personal info
  const getUserInfo = () => {
    setInfoLoading(true);
    axios
      .get(`${baseURL}user_info`, {
        headers: { Authorization: `Bearer ${authRecoil.token}` },
      })
      .then((response) => {
        setPersonalInfo(convertToObjArray(response.data));
        setInfoError(null);
      })
      .catch((error) => {
        setInfoError("Failed to load personal info");
        console.error("Error fetching user info:", error);
      })
      .finally(() => setInfoLoading(false));
  };

  // Get param stream
  const paramStream = () => {
    setParamLoading(true);
    axios
      .get("param_stream/users", {
        headers: { Authorization: `Bearer ${authRecoil.token}` },
      })
      .then((response) => {
        console.log("info run" ,response);
        const res = convertToObjArray(response.data?.[0] || {});
        setParamStreamData(res);
        setParamError(null);
      })
      .catch((error) => {
        setParamError("Failed to load system information");
        console.log("Error fetching param stream:", error);
      })
      .finally(() => setParamLoading(false));
  };

  useEffect(() => {
    if (authRecoil.token) {
      getAllStreams();
      paramStream();
      getUserInfo();
    }
  }, [authRecoil.token]);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={4}
      justifyContent="space-between"
      alignItems="stretch"
    >
      <RenderSection
        title="Personal Info"
        data={personalInfo}
        loading={infoLoading}
        error={infoError}
      />
      <RenderSection
        title="Camera Status"
        data={streamData}
        loading={streamLoading}
        error={streamError}
      />
      <RenderSection
        title="System Information"
        data={paramStreamData}
        fullWidth
        loading={paramLoading}
        error={paramError}
      />
    </Stack>
  );
};

export default Dashboard;
