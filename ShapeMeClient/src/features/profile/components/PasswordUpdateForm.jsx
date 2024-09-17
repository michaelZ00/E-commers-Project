import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../../../features/auth/contexts/AuthContext";

const initialValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const PasswordUpdateForm = () => {
  const { updatePassWord } = useContext(ProfileContext);
  const { userData, setUserData } = useContext(AuthContext);
  const [passwords, setPasswords] = useState(initialValues);
  const [editPassword, setEditPasswords] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword === passwords.confirmPassword) {
      const userChoice = confirm("Do you agree to change the password?");
      if (userChoice) {
        const updatedPasswords = { ...passwords, email: userData.email };
        const response = await updatePassWord(updatedPasswords);
        if (response.data.success) {
          setUserData(response.data.data);
          setPasswords(initialValues);
          setEditPasswords(false);
        } else {
          // Handle error case
          console.error(response.data.message);
        }
      } else {
        setEditPasswords(false);
      }
    } else {
      alert("New password and confirm password do not match.");
    }
  };

  const handleCancel = () => {
    setPasswords(initialValues);
    setEditPasswords(false);
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Change Password</h3>
      <div className="mb-4">
        <label className="block text-gray-700">Current Password:</label>
        <input
          type="password"
          name="currentPassword"
          value={passwords.currentPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={passwords.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div>
            {!editPassword && (
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                onClick={() => setEditPasswords(true)}
              >
                Edit
              </button>
            )}
            {editPassword && (
              <>
                <button
                  type="submit"

                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  "Save Changes"
                </button>
                <button
                  type="button"
                  className="bg-red-500 text-white p-2 rounded-lg ml-2"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
    </form>
  );
};

export default PasswordUpdateForm;
