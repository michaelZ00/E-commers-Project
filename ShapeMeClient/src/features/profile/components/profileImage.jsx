import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { AiOutlineEdit } from "react-icons/ai";
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
const profileUrl = "http://localhost:3000/profile";

const ProfileImage = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const notify = () =>
    toast.success("image was added to the profile", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const [selectedImage, setSelectedImage] = useState(userData?.profileImage);
  const [edit, setEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePicture = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Preview the selected image
    } else {
      setSelectedImage(userData?.profileImage); // Reset to original image if no file is selected
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setSelectedImage(userData?.profileImage);
    setSelectedFile(null);
  };

  const handleImageUpload = async (event) => {
    try {
      event.preventDefault();
      if (!selectedFile) {
        // Show a warning or handle the case where no file is selected
        alert("No file selected. Please choose an image to upload.");
        return;
      }

      const method = userData.profileImage ? "put" : "post";
      const url = userData.profileImage
        ? `${profileUrl}/upDataProfileImage`
        : `${profileUrl}/addProfileImage`;

      const formData = new FormData();
      formData.append("profileImage", selectedFile);
      formData.append("email", userData.email);

      let userChoice = confirm("Do you agree?");
      if (userChoice) {
        const response = await axios({
          method,
          url,
          data: formData,
          withCredentials: true,
        });
        if (response.data.success) {
          notify();
          setSelectedImage(response.data.user.profileImage);
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          setUserData(response.data.user);
          setEdit(false);
          setSelectedFile(null);
        } else {
          setSelectedImage(userData.profileImage);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-md flex flex-col justify-between">
    <div>
      <h2 className="text-xl font-bold mb-4">Profile Image</h2>
      {selectedImage ? (
        <div className="flex justify-center border-black rounded-full mb-4">
          <div className="">
            <img
              src={selectedImage}
              alt="Profile"
              className="max-w-full justify-center max-h-full object-contain"
            />
          </div>
        </div>
      ) : (
        <div className="max-w-full justify-center max-h-full items-center bg-gray-200 rounded-full mb-4">
          No image selected
        </div>
      )}
    </div>
    <div>
      {!edit && (
        <button
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={() => setEdit(true)}
        >
          {selectedImage ? <AiOutlineEdit style={ {verticalAlign: 'middle'} }/> : "Add"}
        </button>
      )}
      {edit && (
        <form
          onSubmit={handleImageUpload}
          className="w-full flex flex-col items-center flex-grow justify-end"
          encType="multipart/form-data"
        >
          <input
            type="file"
            name="profileImage"
            className="w-full p-2 border border-gray-300 rounded cursor-pointer mb-4"
            onChange={handlePicture}
          />
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
  );
};

export default ProfileImage;
