import React from "react";

import { useContext } from "react";
import { useFormik } from "formik";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { styleinput } from "../styles/formStyle";
import NewInputs from "./NewInputs";
import { ToastContainer, toast, Bounce } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigete = useNavigate();
  const {
    login,
    objectSchemaLogin,
    setSignUp,
    setIsUser,
  } = useContext(AuthContext);

  const handleForgetPassword = () => {
    navigete("/forgotPassword");
  };

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: objectSchemaLogin,
    onSubmit: async (values, action) => {
      const [auth, user] = await login(values);
      console.log(auth);
      if (auth) {
        setSignUp(true);
        auth && action.resetForm();
        document.getElementById("my_modal_1").close();
        toast.success(`Wellcome ${user.name}`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
      else {
        toast.error("Wrong Email or Password", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    },
  });
  return (
    <section className="bg-gray-50 dark:bg-gray-900  ">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Login in to your account
        </h1>
        <form className="space-y-4 md:space-y-6" action="">
          <NewInputs
            type="email"
            label="Email"
            name="email"
            onChange={handleChange}
            value={values.email}
            onBlur={handleBlur}
            className={
              errors.email && touched.email
                ? ` border-2 border-rose-600 ${styleinput}`
                : styleinput
            }
            placeholder="Enter email..."
          />
          {errors.email && touched.email && (
            <p className="text-red-600 text-xs	"> {errors.email}</p>
          )}
          <NewInputs
            type="password"
            label="Password"
            name="password"
            onChange={handleChange}
            value={values.password}
            onBlur={handleBlur}
            className={
              errors.password && touched.password
                ? `${styleinput} border-2 border-rose-600`
                : styleinput
            }
            placeholder="***********"
          />
          {errors.password && touched.password && (
            <p className="text-red-600 text-xs	"> {errors.password}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300   rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <button
              className="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleForgetPassword}
            >
              forgot password?
            </button>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
            type="submit"
            className="w-full text-slate bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
          >
            Login in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <button
              onClick={() => setIsUser((prev) => !prev)}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Login;
