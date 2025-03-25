import axios from "axios";
import {authState} from "../Recoil/RecoilState";
import { useRecoilValue } from "recoil";
import {baseURL} from "../utils/StaticVariables"

const testToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbmRheiIsImV4cCI6MTc0Mjk0NjcxMC4zNjc4NzEsInRva2VuX3R5cGUiOiJhY2Nlc3MiLCJjcmVhdGVkX2F0IjoxNzQyOTQ0OTEwLjM2Nzg3OH0.K1qLtTsI6XduboG1N7JvYO2ZQ2yWiwn1KlFZBh8Va-E"

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
        config.headers.Authorization = `Bearer ${testToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return api;
};
