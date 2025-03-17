import { useState, useCallback } from "react";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";

const useAxios = ({ url, method = "GET", body = null }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authRecoil] = useRecoilState(authState);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios({
        url: `${baseURL}/${url}`,
        method,
        data: body,
        headers: {
          Authorization: authRecoil.token ? `Bearer ${authRecoil.token}` : "",
          "Content-Type": "application/json",
        },
      });

      setData(response.data);
      return response.data; // Return for handling in components
    } catch (err) {
      setError(err);
      console.error("Axios Error:", err);
     //  throw err; // Throw error for component handling
    } finally {
      setLoading(false);
    }
  }, [url, method, body, authRecoil.token]);

  return { data, loading, error, fetchData };
};

export default useAxios;
