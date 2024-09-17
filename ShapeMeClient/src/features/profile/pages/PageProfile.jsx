import React, { useState } from "react";
import ProfilePage from "./ProfilePage";

import LogOutProfile from "../components/LogoutProfile";

const PageProfile = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ProfilePage />
      <LogOutProfile />
    </div>
  );
};

export default PageProfile;
