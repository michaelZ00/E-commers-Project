import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../../auth/contexts/AuthContext";
import * as Yup from "yup";

const PersonalInfoForm = () => {

  const { userData, setUserData } = useContext(AuthContext);
  const { updateProfileData } = useContext(ProfileContext);
  const [isEditPersonal, setIsEditPersonal] = useState(false);
  const [initialValues, setInitialValues] = useState(userData);

  // const initialValues = userData;

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
    phone_number: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values, actions) => {
    const userChoice = confirm("Do you agree?");
    if (userChoice) {
      const success = await updateProfileData(values);
      if (success) {
        setUserData(values);
        localStorage.setItem("userData", JSON.stringify(values));
        actions.setSubmitting(false);
        setIsEditPersonal(false);
      }
    } else {
      setUserData(userData);
       // Revert to original values if cancelled
       setInitialValues(userData);
       setIsEditPersonal(false);
    }
  };

  const handleCancel = () => {

    setUserData(initialValues); // Revert to original values on cancel
    setInitialValues(userData);
    setIsEditPersonal(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      // enableReinitialize={true}
    >
      {({ isSubmitting, values }) => (
        <Form className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Personal Info</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            {isEditPersonal ? (
              <Field
                name="name"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="w-full p-2 border border-gray-300 rounded-lg">
                {values.name}
              </div>
            )}
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <Field
              name="email"
              type="email"
              readOnly={true}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address:</label>
            {isEditPersonal ? (
              <Field
                name="address"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="w-full p-2 border border-gray-300 rounded-lg">
                {values.address}
              </div>
            )}
            <ErrorMessage
              name="address"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone:</label>
            {isEditPersonal ? (
              <Field
                name="phone_number"
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <div className="w-full p-2 border border-gray-300 rounded-lg">
                {values.phone_number
                  ? values.phone_number
                  : "Enter phone number"}
              </div>
            )}
            <ErrorMessage
              name="phone_number"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>
          <div>
            {!isEditPersonal && (
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                onClick={() => setIsEditPersonal(true)}
              >
                Edit
              </button>
            )}
            {isEditPersonal && (
              <>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white p-2 rounded-lg"
                >
                  {isSubmitting ? "Submitting..." : "Save Changes"}
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
        </Form>
      )}
    </Formik>
  );
};

export default PersonalInfoForm;
