import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const url = "http://localhost:3000/profile";

export const ProfileContext = createContext();

const initialProfileData = {
  image: "https://via.placeholder.com/150",
  name: "John Doe",
  email: "john.doe@example.com",
  address: "123 Main St",
  phone_number: "123-456-7890",
};

const ProfileProvider = ({ children }) => {

  const [isEditPersonal, setIsEditPersonal] = useState(false);
  const [profileData, setProfileData] = useState(initialProfileData);

  const updateProfileData = async (values) => {
    try {
      const response = await axios.put(`${url}/upDataProfile`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        return true;
      } else {
        throw new Error("Data was not fetched successfully");
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error during updateProfileData:", error);
      return false;
    }
  };
  const upDateWorkOutData = async (values) => {
    try {
      const response = await axios.put(`${url}/upDataWorkOut`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("workout updated successfully!");
        return true;
      } else {
        throw new Error("Data was not fetched successfully");
      }
    } catch (error) {
      toast.error("Error updating workout");
      console.error("Error during upDataWorkOut:", error);
      return false;
    }
  };

  const updatePassWord = async (values) => {
    try {
      const response = await axios.put(`${url}/upDataPassword`, values, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Password updated successfully!");
        return response;
      } else {
        throw new Error("Data was not fetched successfully");
      }
    } catch (error) {
      toast.error("Error updating Password");
      console.error("Error during upData Password:", error);
      return false;
    }
  };

  const values = {
    profileData,
    setProfileData,
    isEditPersonal,
    setIsEditPersonal,
    updateProfileData,
    upDateWorkOutData,
    updatePassWord
  };

  return (
    <ProfileContext.Provider value={values}>
      {children}
      <ToastContainer />
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
