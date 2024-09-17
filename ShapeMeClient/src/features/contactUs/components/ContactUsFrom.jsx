import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const url = "http://localhost:3000/complaints";

const ContactUsForm = () => {
  const [files, setFiles] = useState([]);

  // const handleFileChange = (event) => {
  //   const newFiles = Array.from(event.target.files).map((file) => ({
  //     id: Date.now() + file.name, // Generate a unique identifier for each file
  //     file,
  //   }));
  //   setFiles([...files, ...newFiles]);
  // }

  const initialValues = {
    name: "",
    email: "",
    subject: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("subject", values.subject);
      formData.append("description", values.description);

      files.forEach((file) => {
        formData.append("files", file);
        console.log("Added file:", file.name);
      });

      const { data } = await axios.post(`${url}/postComplaint`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(data);

      alert("Form submitted successfully!");
      actions.resetForm();
      setFiles([]);
      actions.setSubmitting(false);
    } catch (error) {
      console.log(error);
      actions.setSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    setFiles([...files, ...Array.from(event.target.files)]);
  };
  const handleFileDelete = (fileIndex) => {
    const updatedFiles = [...files];
    updatedFiles.splice(fileIndex, 1);
    setFiles(updatedFiles);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="bg-white rounded-lg shadow p-8 dark:bg-gray-800">
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Contact Us
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your name..."
                  />
                  <ErrorMessage
                    name="name"
                    component="p"
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email..."
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="mt-2 text-sm text-red-600 dark:text-red-500"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Subject
                </label>
                <Field
                  type="text"
                  name="subject"
                  id="subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter the subject of your complaint..."
                />
                <ErrorMessage
                  name="subject"
                  component="p"
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  id="description"
                  rows="4"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Provide a detailed description of your complaint..."
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="mt-2 text-sm text-red-600 dark:text-red-500"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="files"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Files (optional)
                </label>
                <input
                  type="file"
                  name="files"
                  multiple
                  onChange={handleFileChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              {files.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium text-gray-900 dark:text-white mb-2">
                    Selected Files:
                  </p>
                  <ul className="list-none text-sm text-gray-600 dark:text-gray-400">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <span>{file.name}</span>
                        <button
                          type="button"
                          onClick={() => handleFileDelete(index)}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-primary-600 text-white p-3 rounded-lg font-medium tracking-wide uppercase text-sm hover:bg-primary-700 focus:outline-none focus:bg-primary-700"
              >
                {isSubmitting ? "Submitting..." : "Submit message"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUsForm;
