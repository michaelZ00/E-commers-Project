// WorkoutInfo.js
import React, { useContext, useState } from "react";
import { ProfileContext } from "../context/ProfileContext";
import { AuthContext } from "../../auth/contexts/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const WorkoutInfo = () => {
  const { userData, setUserData } = useContext(AuthContext);
  const { upDateWorkOutData } = useContext(ProfileContext);
  const [isEditWorkOut, setIsEditWorkOut] = useState(false);

  const initialValues = userData;

  const validationSchema = Yup.object().shape({
    height: Yup.string().required("Height is required"),
    weight: Yup.string().required("Weight is required"),
    bmi: Yup.string().required("BMI is required"),
    workoutInfo: Yup.string().required("Workout info is required"),
  });

  const handleSubmit = async (values, actions) => {
    const userChoice = confirm("Do you agree?");
    console.log(values);
    if (userChoice) {
      const success = await upDateWorkOutData(values);
      if (success) {
        setUserData(values);
        localStorage.setItem("userData", JSON.stringify(values));
        actions.setSubmitting(false);
        setIsEditWorkOut(false);
      }
    } else {
      setUserData(userData); // Revert to original values if cancelled
      setIsEditWorkOut(false);
    }
  };

  const handleCancel = () => {
    setUserData(userData); // Revert to original values on cancel
    setIsEditWorkOut(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-4">Edit Workout Info</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Height:</label>

            <Field
              name="height"
              type="text"
              placeholder="Enter height"
              readOnly={!isEditWorkOut}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {/* <ErrorMessage
              name="height"
              component="div"
              className="text-red-500 text-sm mt-1"
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Weight:</label>

            <Field
              name="weight"
              type="text"
              placeholder="Enter weight"
              readOnly={!isEditWorkOut}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            {/* <ErrorMessage
              name="weight"
              component="div"
              className="text-red-500 text-sm mt-1"
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">BMI:</label>

            <Field
              name="bmi"
              type="text"
              placeholder="Enter BMI"

              readOnly={!isEditWorkOut}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            {/* <ErrorMessage
              name="bmi"
              component="div"
              className="text-red-500 text-sm mt-1"
            /> */}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Workout Info:</label>

            <Field
              name="workoutInfo"
              type="text"
              placeholder="Enter workout info"
              readOnly={!isEditWorkOut}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />

            {/* <ErrorMessage
              name="workoutInfo"
              component="div"
              className="text-red-500 text-sm mt-1"
            /> */}
          </div>
          <div>
            {!isEditWorkOut && (
              <button
                type="button"
                className="bg-blue-500 text-white p-2 rounded-lg mr-2"
                onClick={() => setIsEditWorkOut(true)}
              >
                Edit
              </button>
            )}
            {isEditWorkOut && (
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

export default WorkoutInfo;
