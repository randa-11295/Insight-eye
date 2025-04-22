// src/hooks/useFetchStreams.js
import { useEffect, useCallback } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { streamState } from "../Recoil/RecoilState";
import { baseURL } from "../utils/StaticVariables";

const useFetchStreams = () => {
  const [streamRecoil, setStreamRecoil] = useRecoilState(streamState);

  const fetchStreams = useCallback(async () => {
    console.log("stream from recoil", streamRecoil);
    console.log("call stream api now");
    // Start fresh
    setStreamRecoil({
      data: [],
      selected: [],
      loading: true,
      error: null,
    });

    try {
      const { data } = await axios.get(`${baseURL}source`, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      });

      // First, update the data (keep loading true)
      setStreamRecoil((prev) => ({
        ...prev,
        data,
        selected: data.map((s) => s.id),
      }));

      // Then, stop loading after a tiny delay (in the next tick)
      setTimeout(() => {
        setStreamRecoil((prev) => ({
          ...prev,
          loading: false,
        }));
      }, 0);
    } catch (err) {
      console.error("Error fetching stream data:", err);
      setStreamRecoil((prev) => ({
        ...prev,
        loading: false,
        error: "Failed to load camera list. Please try again.",
      }));
    }
  }, [setStreamRecoil]);

  useEffect(() => {
    fetchStreams(); // Auto-fetch on mount
  }, [fetchStreams]);

  return { refetchStreams: fetchStreams };
};

export default useFetchStreams;
