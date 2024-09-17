import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const url = "http://localhost:3000/users/resetPassword";

function ResetPassword() {
  const { setIsAuth } = useContext(AuthContext);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const id = query.get("uid");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const confirmPassword = e.target.confirm_password.value;
    const password = e.target.password.value;
    if (confirmPassword !== password) return alert("Passwords do not match");
    try {
      const { data } = await axios.post(`${url}?token=${token}&uid=${id}`, {
        password,
      });
      if (data.success) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred");
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-500">
        <div className="p-6 sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Change Password
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Please enter your new password.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ResetPassword;
