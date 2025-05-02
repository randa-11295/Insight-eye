// src/hooks/useFetchStreams.js
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { streamState } from "../Recoil/RecoilState";
import { baseURL } from "../utils/StaticVariables";

const useFetchStreams = () => {
  const [streamRecoil, setStreamRecoil] = useRecoilState(streamState);



  const fetchStreams = useCallback(async () => {
    try {
      const { data } = await axios.get(`${baseURL}source`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });

      // Single update: load data, set selected IDs, flip loading off, clear previous error
      setStreamRecoil((prev) => ({
        ...prev,
        data,
        selected: data?.map((s) => s.id),
        loading: false,
        error: null,
      }));
    } catch (err) {
      console.error("Error fetching stream data:", err);

      // Single update on error: flip loading off and record error message
      setStreamRecoil((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load camera list. Please try again.",
      }));
    }
  }, [setStreamRecoil]);

  // Kick off the fetch on mount
  useEffect(() => {
    if(streamRecoil.data === null) fetchStreams();
  }, [fetchStreams, streamRecoil.data]);

  return { refetchStreams: fetchStreams };
};

export default useFetchStreams;
