

import React, { useContext, useState } from "react";
import UserInput from "./UserInput";
import { styleinput, stylelable } from "../../../../../../style/fromStyle";
import { CrudContext } from "../../../../../../contexts/CrudContext";
import Button from "../Buttons";
import { useEffect } from "react";




export default function Userform({ data, label, url}) {
  
  const {  handleFrom, addOrEditAction } = useContext(CrudContext);
  

  const initialValues = {
    name: data ? data.name : "",
    lastName: data ?data.lastName : "",
    email: data ? data.email :"" ,
    address: data ? data.address : "",
    role: data ? data.role : "",
  }

  const [objValues, setObjValues] = useState(initialValues);

  useEffect(()=>{
    setObjValues(initialValues)
  },[data])
  
  function handleChange(e) {
    const { value, name } = e.target;
    setObjValues({ ...objValues, [name]: value });
  }

  function handleSubmit(e) {
    // Check if data exists and has an id property
    if (data && data.id) {
      addOrEditAction(e, objValues, data.id);
    } else if (data === null || data === undefined) {
      // If data is null or undefined, call addOrEditAction without the id
      addOrEditAction(e, objValues, null);
    } else {
      console.error("Data is present but does not have an 'id' property");
      // Handle the error appropriately, e.g., show an error message to the user
    }
  }

  const handleId = (key) => {
    if (key !== "id") return key;
  };

  
  return (
    <dialog id="table_modal" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <div className="modal-action">
          <form
            onSubmit={handleSubmit}
            id="table_form"
            className="w-[80%] mx-auto"
            method="dialog"
          >
            <label htmlFor="">hello!</label>
            {label
              ? label.map((input, i) => (
                  <UserInput
                    handleId={handleId}
                    key={i}
                    name={input}
                    stylelable={stylelable}
                    styleinup={styleinput}
                    onChange={handleChange}
                    defaultValue={data ? data[input] : ""}
                    type="text" // Change to a valid input type if needed
                    label={handleId(input)}
                  />
                ))
              : ""}
            <div className="flex justify-center space-x-20">
              <Button
                type="submit"
                styles="px-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-40 sm:w-auto py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                value={data ? "Edit" : "Add"}
              />

              <Button styles="btn px-10" onClick={handleFrom} value={"close"} />
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
