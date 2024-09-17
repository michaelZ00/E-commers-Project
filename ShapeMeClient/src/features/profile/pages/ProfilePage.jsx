import React, { useContext } from "react";
import ProfileImage from "../components/profileImage";
import PersonalInfoForm from "../components/PersonalInfoForm";
import PasswordUpdateForm from "../components/PasswordUpdateForm";
import WorkoutInfo from "../components/WorkoutInfo";
import UserOrders from "../components/UserOrders";

const ProfilePage = () => {
  return (
    <div className="p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Profile info
      </h1>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="w-full sm:w-1/3">
          <ProfileImage />
        </div>
        <div className="w-full sm:w-1/3">
          <PersonalInfoForm />
        </div>
        <div className="w-full sm:w-1/3">
          <UserOrders />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
        <div className="w-full h-full sm:w-1/3">
          <PasswordUpdateForm />
        </div>
        <div className="w-full h-full sm:w-1/3">
          <WorkoutInfo />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
