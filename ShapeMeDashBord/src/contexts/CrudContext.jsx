import { createContext, useEffect, useState } from "react";
import axios from "axios";

const url = "http://localhost:3000/managers";

export const CrudContext = createContext();

function CrudProvider({ children }) {


  const [table, setTable] = useState([]);
  const [updateTable, setUpdetedTable] = useState(false);
  const [getUser, setGetUser] = useState(true);
  const [oldUser, setOldUser] = useState(null);
  const [sendGetRequest, setSendGetRequest] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [isError,setIsError] = useState('');  async function upDataUser(user) {
    setOldUser(user);
    document.getElementById("table_modal").showModal();
  }

  const deleteUser = async (user) => {
    try {
      let userChoice = confirm("Do you agree?");
      if (userChoice) {
        const response = await axios.delete(`${url}/delete/${user.id}`, {
          withCredentials: true,
        });
        console.log(response);
        if (response.data.success) throw new Error(data.message);
        if (response.data.success) throw new Error(data.token);
        setGetUser((prev) => !prev);
      }
    } catch (error) {
    } finally {
      setUpdetedTable((prev) => !prev);
    }
  };

  async function fetchData() {
    try {
      setIsLoading(true)
      const response = await axios.get(`${url}/getAll`, {
        withCredentials: true,
      });
      setTable(response.data.users);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
    finally{
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchData();
  }, [getUser, updateTable]);

  const addOrEditAction = async (e, objValues, id) => {
    try {
      e.preventDefault();

      const url1 = id ? `${url}/upData/${id}` : `${url}/add`;
      const method = id ? "put" : "post";

      const response = await axios({
        method: method,
        url: url1,
        data: objValues,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(response);
      const responseData = response.data;
      if (!responseData.success) {
        throw new Error("Data was not fetched successfully");
      }

      document.getElementById("table_form").reset();
      document.getElementById("table_modal").close();
      setUpdetedTable((prev) => !prev);
    } catch (error) {
      console.error("Error during AddOrEditAction:", error);
    }
  };

  function handleFrom(e) {
    e.preventDefault(e);
    document.getElementById("table_form").reset();
    document.getElementById("table_modal").close();
  }

  const values = {
    sendGetRequest,
    setSendGetRequest,
    oldUser,
    setOldUser,
    table,
    setTable,
    upDataUser,
    deleteUser,
    addOrEditAction,
    url,
    getUser,
    setGetUser,
    updateTable,
    setUpdetedTable,
    handleFrom,
    isLoading,
    setIsLoading
  };

  return <CrudContext.Provider value={values}>{children}</CrudContext.Provider>;
}
export default CrudProvider;
