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
 
  // const expireDate = new Date(useRecoilValue(authState).expire);
  // const currentDate = new Date();
  // console.log("expireDate" + expireDate)
  // console.log("currentDate" + currentDate)
  // currentDate > expireDate ?  console.log("after") :  console.log(" before");
  

  const token = useRecoilValue(authState)?.token; 
console.log(token)
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
