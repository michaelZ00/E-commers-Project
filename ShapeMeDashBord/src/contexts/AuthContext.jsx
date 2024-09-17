import { createContext, useEffect, useState } from "react";
import axios from "axios";
import * as Yup from "yup";
//creats a component werehouse that will have the functioality of authtocations and form submission
//export const [name of the werehouse]'name' = createContext() - creating the componetn
const url = "http://localhost:3000/managers";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const [sendGetRequest, setSendGetRequest] = useState(false);
  const [isDarkMode, setDarkMode] = useState("dark");
  const [isAuth, setIsAuth] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [getProduct, setGetProduct] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const authManager = async () => {
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

      setIsAuth(true);

      return true;
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

      console.log("hello i am in!");

      console.log(data);

      if (!data.success) throw new Error("dont success to rgister");
      setSignUp(true);
      setIsAuth(true);
      return true;
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
      .required("Manager Email is Required"),
    password: Yup.string()
      .max(12, "password cant be greater than 12 digits")
      .required("Manager password is Required"),
  });

  const objectSchemaSignUp = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
    phone: Yup.string(),
    //   .matches(/^(\+972|0)?[5-9]\d{8}$/, "Invalid Israeli phone number")
    //   .required("Phone number is required"),
  });

  useEffect(() => {
    if (isDarkMode === "dark") {
      document.documentElement.classList.add("dark");
    } else document.documentElement.classList.remove("dark");
  }, [isDarkMode]);

  useEffect(() => {
    authManager();
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
    objectSchemaLogin,
    getProduct,
    setGetProduct,
    register,
    sendGetRequest,
    setSendGetRequest,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
