import React, { useState } from "react";
import PropTypes from "prop-types";
import { IoArrowUpSharp, IoArrowDownSharp } from "react-icons/io5";

const SubmissionDetails = ({ formData, handleDeleteFile }) => {
  const [sortIndex, setSortIndex] = useState(null);
  const [sort, setSort] = useState("DESC");

  const handleSort = (col) => {
    if (sort === "DESC") {
      formData.files.sort((a, b) => (a[col] > b[col] ? -1 : 1));
      setSort("ASC");
    } else {
      formData.files.sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setSort("DESC");
    }
    setSortIndex(col);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 mx-5 w-full">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white rounded-lg shadow p-8 dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Form Submission Details
          </h1>
          <div className="grid grid-cols-1 gap-6">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name:
              </label>
              <p className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:text-white">
                {formData.name}
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email:
              </label>
              <p className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:text-white">
                {formData.email}
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Subject:
              </label>
              <p className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:text-white">
                {formData.subject}
              </p>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description:
              </label>
              <p className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:text-white">
                {formData.description}
              </p>
            </div>
            {formData.files.length > 0 && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Files:
                </label>
                <ul className="bg-gray-100 dark:bg-gray-700 border border-gray-300 text-gray-900 sm:text-sm rounded-lg p-2.5 dark:text-white">
                  <li className="flex items-center justify-between">
                    <span
                      onClick={() => handleSort("file_name")}
                      className="cursor-pointer"
                    >
                      File Name
                      {sortIndex === "file_name" && sort === "DESC" && (
                        <IoArrowUpSharp
                          size={15}
                          className="ml-1 text-red-600 dark:text-red-500"
                        />
                      )}
                      {sortIndex === "file_name" && sort === "ASC" && (
                        <IoArrowDownSharp
                          size={15}
                          className="ml-1 text-red-600 dark:text-red-500"
                        />
                      )}
                    </span>
                    <span
                      onClick={() => handleSort("file_size")}
                      className="cursor-pointer"
                    >
                      File Size
                      {sortIndex === "file_size" && sort === "DESC" && (
                        <IoArrowUpSharp
                          size={15}
                          className="ml-1 text-red-600 dark:text-red-500"
                        />
                      )}
                      {sortIndex === "file_size" && sort === "ASC" && (
                        <IoArrowDownSharp
                          size={15}
                          className="ml-1 text-red-600 dark:text-red-500"
                        />
                      )}
                    </span>
                  </li>
                  {formData.files.map((file, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <span>{file.file_name}</span>
                      <span>{file.file_size}</span>
                      <button
                        className="ml-2 text-red-600 dark:text-red-500 hover:text-red-800 dark:hover:text-red-700 focus:outline-none"
                        onClick={() => handleDeleteFile(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white ml-2 px-4 py-2 rounded-lg focus:outline-none">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

SubmissionDetails.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        file_name: PropTypes.string.isRequired,
        file_size: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
};

export default SubmissionDetails;
