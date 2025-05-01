import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState, streamState, isActiveUserState } from "../Recoil/RecoilState";
import useFetchStreams from "../hooks/useFetchStreams";
import axios from "axios";
import { convertToObjArray } from "../utils/helpers";
import { baseURL } from "../utils/StaticVariables";
import DashboardCards from "../Components/Cards/DashboardCards";

const Dashboard = () => {
  const setIsActiveUser = useSetRecoilState(isActiveUserState);
  const { token } = useRecoilValue(authState);
  const streamAtom = useRecoilValue(streamState);
  const {
    data: streamData,
    loading: streamLoading,
    error: streamError,
  } = streamAtom;
  const { refetchStreams } = useFetchStreams();

  const [personalInfo, setPersonalInfo] = useState([]);
  const [systemInfo, setSystemInfo] = useState([]);
  const [newFormatOfStreamData, setNewFormatOfStreamData] = useState([]);

  const [loading, setLoading] = useState({ info: true, system: true });
  const [error, setError] = useState({ info: null, system: null });

  // Refetch stream data and call APIs separately
  useEffect(() => {
    if (!token) return;

    // Fetch stream data (via Recoil custom hook)
    refetchStreams();

    // Fetch personal user info
    const fetchUserInfo = async () => {
      setLoading((prev) => ({ ...prev, info: true }));
      try {
        const res = await axios.get(`${baseURL}user_info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPersonalInfo(convertToObjArray(res?.data));
        setIsActiveUser(res?.data?.is_subscribed);
        setError((prev) => ({ ...prev, info: null }));
      } catch (err) {
        setError((prev) => ({ ...prev, info: "Unable to load personal info." }));
      } finally {
        setLoading((prev) => ({ ...prev, info: false }));
      }
    };

    // Fetch system info
    const fetchSystemInfo = async () => {
      setLoading((prev) => ({ ...prev, system: true }));
      try {
        const res = await axios.get(`${baseURL}param_stream/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSystemInfo(convertToObjArray(res?.data || {}));
        setError((prev) => ({ ...prev, system: null }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          system: "Unable to load system info.",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, system: false }));
      }
    };

    // Run both separately
    fetchUserInfo();
    fetchSystemInfo();
  }, [token, refetchStreams, setIsActiveUser]);

  // Transform stream data into card-friendly format
  useEffect(() => {
    const res = streamData?.map((el) => ({
      title: el?.name,
      val: el?.status === "inactive" ? "Off" : "On",
    }));
    setNewFormatOfStreamData(res);
  }, [streamData]);

  return (
    <Stack
      direction={{ lg: "row" }}
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
