import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";

//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn
const url = "http://localhost:3000/users";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [sendGetRequest, setSendGetRequest] = useState(false);
  const [isDarkMode, setDarkMode] = useState("light");
  const [isAuth, setIsAuth] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : {};
  });




  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const authUser = async () => {
    try {
      const { data } = await axios.get(`${url}/auth`, {
        withCredentials: true,
      });
      if (!data.success) throw new Error("dont valid token");
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setIsAuth(false);
    }
  };

  const login = async (input) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${url}/login`, input, {
        withCredentials: true,
      });

      console.log("hello i am in!");

      console.log(data);

      if (!data.success) throw new Error("dont success to login");

      setUserData(data.user);

      localStorage.setItem("userData", JSON.stringify(data.user));
      setIsAuth(true);
      
      console.log(data.user.email);
      console.log(data.user.name);
      return [true, data.user];
    } catch (error) {
      console.log("here i am, not in!!");
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    try {
      const { data } = await axios.get(`${url}/logout`, {
        withCredentials: true,
      });
      if (data.success) {
        setUserData({});
        localStorage.removeItem("userData");
        setIsAuth(false);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const register = async (input) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(`${url}/register`, input, {
        withCredentials: true,
      });

      console.log(data);

      if (!data.success) throw new Error("dont success to rgister");
      setSignUp(true);
      setUserData(data.user);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setIsAuth(true);
      return [true, data.user];
    } catch (error) {
      console.log("here i am, not in!!");
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const objectSchemaLogin = Yup.object({
    email: Yup.string()
      .email("email must be valid email")
      .required("User Email is Required"),
    password: Yup.string()
      .max(12, "password cant be greater than 12 digits")
      .required("User password is Required"),
  });

  const objectSchemaSignUp = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .max(12, "password cant be greater than 12 digits")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string(),
    //   .matches(/^(\+972|0)?[5-9]\d{8}$/, "Invalid Israeli phone number")
    //   .required("Phone number is required"),
  });

  useEffect(() => {
    const savedUserData = localStorage.getItem("userData");
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setIsAuth(true);
    }
  }, []);

  const values = {
    objectSchemaSignUp,
    signUp,
    setSignUp,
    toggleDarkMode,
    isDarkMode,
    setDarkMode,
    login,
    setIsAuth,
    isAuth,
    logOut,
    authUser,
    objectSchemaLogin,
    register,
    sendGetRequest,
    setSendGetRequest,
    searchTerm,
    setSearchTerm,
    isUser,
    setIsUser,
    userData,
    setUserData,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
