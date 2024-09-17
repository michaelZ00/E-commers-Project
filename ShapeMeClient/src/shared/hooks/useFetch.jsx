// src/shared/hooks/useFetch.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../features/auth/contexts/AuthContext";

const useFetch = (url) => {
  const { sendGetRequest } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  async function getRequest() {
    try {
      setIsLoading(true);
      const { data } = await axios.get(url, { withCredentials: true });
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
      setIsError(error.message);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getRequest();
  }, [sendGetRequest]);

  return [data, isLoading, isError];
};

export default useFetch;
