import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRecoilValue } from "recoil";
import { authState, streamState } from "../Recoil/RecoilState";
import useFetchStreams from "../hooks/useFetchStreams";
import axios from "axios";
import { convertToObjArray } from "../utils/helpers";
import { baseURL } from "../utils/StaticVariables";
import DashboardCards from "../Components/Cards/DashboardCards";

const Dashboard = () => {
  // Authentication token
  const { token } = useRecoilValue(authState);

  // Stream atom state and fetch function
  const streamAtom = useRecoilValue(streamState);
  const {
    data: streamData,
    loading: streamLoading,
    error: streamError,
  } = streamAtom;
  const { refetchStreams } = useFetchStreams();

  // Local states for personal and system info
  const [personalInfo, setPersonalInfo] = useState([]);
  const [systemInfo, setSystemInfo] = useState([]);
  const [newFormatOfStreamData, setNewFormatOfStreamData] = useState({});

  // Combined loading and error states for these two
  const [loading, setLoading] = useState({ info: true, system: true });
  const [error, setError] = useState({ info: null, system: null });

  // On mount or token change, fetch all data
  useEffect(() => {
    if (!token) return;

    // Refetch streams via Recoil hook
    refetchStreams();

    // Fetch user and system info in parallel
    (async () => {
      setLoading({ info: true, system: true });
      try {
        const [infoRes, sysRes] = await Promise.all([
          axios.get(`${baseURL}user_info`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}param_stream/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setPersonalInfo(convertToObjArray(infoRes.data));
        setSystemInfo(convertToObjArray(sysRes.data?.[0] || {}));
        setError({ info: null, system: null });
      } catch (err) {
        console.error("Error fetching user/system info", err);
        setError({
          info: "Unable to load personal info.",
          system: "Unable to load system info.",
        });
      } finally {
        setLoading({ info: false, system: false });
      }
    })();
  }, [token, refetchStreams]);

  useEffect(() => {
    const res = streamData?.map((el) => ({
      title: el.name,
      val: el.status === "inactive" ? "Off" : "On",
    }));
    setNewFormatOfStreamData(res);
  }, [streamData]);

  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={4}
      justifyContent="space-between"
    >
      <DashboardCards
        title="Personal Info"
        data={personalInfo}
        loading={loading.info}
        error={error.info}
      />

      <DashboardCards
        title="Camera Status"
        data={newFormatOfStreamData}
        loading={streamLoading}
        error={streamError}
      />

      <DashboardCards
        title="System Information"
        data={systemInfo}
        fullWidth
        loading={loading.system}
        error={error.system}
      />
    </Stack>
  );
};

export default Dashboard;
