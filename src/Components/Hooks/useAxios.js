import { useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";


const useAxios = ({ url, method = "GET", body = null }) => {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [authRecoil] = useRecoilState(authState);

     useEffect(() => {
          const fetchData = () => {
               setLoading(true);

               axios({
                    url: baseURL +"/"+ url,
                    method,
                    data: body,
                    headers: {
                         Authorization: authRecoil.token ? `Bearer ${authRecoil.token}` : "",
                         "Content-Type": "application/json",
                    },
               })
                    .then((response) => {
                         setData(response.data);
                    })
                    .catch((err) => {
                         setError(err);
                    })
                    .finally(() => {
                         setLoading(false);
                    });
          };

          fetchData();
     }, [url, method, body, authRecoil.token]);

     return { data, loading, error };
};

export default useAxios;
