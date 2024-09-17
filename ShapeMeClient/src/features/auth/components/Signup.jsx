import React from "react";
import { useContext } from "react";
import { useFormik } from "formik";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { styleinput } from "../styles/formStyle";
import NewInputs from "./NewInputs";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const { register, objectSchemaSignUp, setIsUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: objectSchemaSignUp,
    onSubmit: async (values, actions) => {
      const [auth, user] = await register(values);
      if (auth) {
        toast.success(`Welcome ${user.name}`, {
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
        actions.resetForm();
        setIsUser(true);
        navigate("/");
      }
    },
  });

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create your account
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <NewInputs
            type="email"
            label="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            onBlur={formik.handleBlur}
            className={
              formik.errors.email && formik.touched.email
                ? `border-2 border-rose-600 ${styleinput}`
                : styleinput
            }
            placeholder="Enter email..."
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-xs">{formik.errors.email}</p>
          )}
          <NewInputs
            type="password"
            label="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? `border-2 border-rose-600 ${styleinput}`
                : styleinput
            }
            placeholder="***********"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-xs">{formik.errors.password}</p>
          )}
          <NewInputs
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            className={
              formik.errors.confirmPassword && formik.touched.confirmPassword
                ? `border-2 border-rose-600 ${styleinput}`
                : styleinput
            }
            placeholder="***********"
          />
          {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <p className="text-red-600 text-xs">{formik.errors.confirmPassword}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                  Remember me
                </label>
              </div>
            </div>
            
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create Account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Have an account already?{" "}
            <button
              onClick={() => setIsUser(true)}
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
