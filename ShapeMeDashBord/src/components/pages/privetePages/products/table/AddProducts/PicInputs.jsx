import React from "react";

function PicInputs({ name, id, value }) {
  return (
    <>
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor={id}
      >
        {name}
      </label>
      <input
        className="my-5 block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={id}
        name={id}
        type="file"
        defaultValue={value}
      ></input>
    </>
  );
}

export default PicInputs;
