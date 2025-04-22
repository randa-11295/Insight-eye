import axios from "axios";
import { authState } from "../Recoil/RecoilState";
import { useRecoilValue } from "recoil";
import { baseURL } from "../utils/StaticVariables";
import { useMemo } from "react";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosWithAuth = () => {
  const token = useRecoilValue(authState)?.token;

  return useMemo(() => {
    // console.log("token run in api"); // This will now run **only** when token changes

    api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return api;
  }, [token]); // The API instance will **only** be updated when the token changes
};
