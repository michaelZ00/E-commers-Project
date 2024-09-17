import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";


//async state managment
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState('');
  const { sendGetRequest } = useContext(AuthContext);

  async function getRequest() {
    try {
      setIsLoading(true)
      const { data } = await axios.get(url);
      console.log(data)
      setData(data)
    } catch (error) {
      console.log(error);
      setIsError(error.message)
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getRequest();
  }, [sendGetRequest]);

  return [data,isLoading,isError];
};

export default useFetch;