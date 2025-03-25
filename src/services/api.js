import axios from "axios";
import {authState} from "../Recoil/RecoilState";
import { useRecoilValue } from "recoil";
import {baseURL} from "../utils/StaticVariables"

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useAxiosWithAuth = () => {
  const token = useRecoilValue(authState).token; // Get token from Recoil
console.log(token)
  // Add request interceptor
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
};
