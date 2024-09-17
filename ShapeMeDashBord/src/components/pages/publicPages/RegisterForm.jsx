import { useContext, useEffect } from "react";
import Input from "../../common/Input";
import { Formik, Form as FormikForm } from "formik";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { styleinput, stylelable } from "../../../style/fromStyle";
// import * as Yup from "yup";

const initialValues = {
  name: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
};

function RegisterForm() {
  const { objectSchemaSignUp, signUp, register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (signUp) {
      navigate("/login");
    }
  }, [signUp, navigate]);

  const handleSubmit = async (values, actions) => {
    const { setSubmitting, resetForm } = actions;

    try {
      const signtrue = await register(values);
      console.log(signtrue);
      if (signtrue) {
        resetForm();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={objectSchemaSignUp}
      onSubmit={handleSubmit}
    >
      <section className="bg-gray-50 dark:bg-gray-900  ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-500">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up to your account
              </h1>
              <FormikForm className="space-y-4 md:space-y-6" action="#">
                <Input
                  label="First name"
                  type="text"
                  name="name"
                  placeholder="Enter first name..."
                  stylelable={stylelable}
                  styleinup={styleinput}
                />

                <Input
                  label="Last name"
                  type="text"
                  name="lastName"
                  placeholder="Enter last name..."
                  stylelable={stylelable}
                  styleinup={styleinput}
                />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  stylelable={stylelable}
                  styleinup={styleinput}
                />

                <Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="***********"
                  stylelable={stylelable}
                  styleinup={styleinput}
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  placeholder="Enter your confirm Password"
                  stylelable={stylelable}
                  styleinup={styleinput}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
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
                </div>
                <button
                  type="submit"
                  className="w-full text-slate bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 dark:text-white"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  if you have an account!{" "}
                  <Link
                    to={"/login"}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login
                  </Link>
                </p>
              </FormikForm>
            </div>
          </div>
        </div>
      </section>
    </Formik>
  );
}

export default RegisterForm;

//   onSubmit={async (values, action) => {
//     console.log("sdfsdf")
//     // if (values.confirm_password !== values.password) {
//     // }
//     // const signtrue = await register(values);
//     // console.log(signtrue);
//     // if (signtrue) {
//     //   action.resetForm();
//     // }
//   }}
