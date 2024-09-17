import React, { useContext, useState, useEffect } from "react";
import SimpelUserInput from "./SimpelInput";
import { styleinput, stylelable } from "../../../../../../style/fromStyle";
import { CrudContext } from "../../../../../../contexts/CrudContext";
import Button from "../TableUtils/Buttons";

export default function SimpelUserForm({ data }) {
  const { addOrEditAction } = useContext(CrudContext);

  function handleFrom(e) {
    e.preventDefault();
    document.getElementById("table_form").reset();
    document.getElementById("table_modal").close();
  }

  const initialValues = {
    name: data ? data.name : "",
    lastName: data ? data.lastName : "",
    email: data ? data.email : "",
    address: data ? data.address : "",
    role: data ? data.role : "",
  };

  const [objValues, setObjValues] = useState(initialValues);

  useEffect(() => {
    setObjValues(initialValues);
  }, [data]);

  function handleChange(e) {
    const { value, name } = e.target;
    setObjValues({ ...objValues, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (data && data.id) {
      addOrEditAction(e, objValues, data.id);
    } else if (data === null || data === undefined) {
      addOrEditAction(e, objValues, null);
    } else {
      console.error("Data is present but does not have an 'id' property");
    }
  }

  return (
    <dialog id="table_modal" className="modal">
      <div className="modal-box bg-gray-50 dark:bg-gray-900  ">
        <h3 className="font-bold text-lg  dark:text-white">Hello!</h3>
        <div className="modal-action">
          <form
            onSubmit={handleSubmit}
            id="table_form"
            className="w-[80%] mx-auto"
            method="dialog"
          >
            <SimpelUserInput
              key={1}
              name="name"
              stylelable={stylelable}
              styleinup={styleinput}
              onChange={handleChange}
              defaultValue={data ? data.name : ""}
              type="text"
              label="Name"
            />
            <SimpelUserInput
              key={2}
              name="lastName"
              stylelable={stylelable}
              styleinup={styleinput}
              onChange={handleChange}
              defaultValue={data ? data.lastName : ""}
              type="text"
              label="Last Name"
            />
            <SimpelUserInput
              key={3}
              name="email"
              stylelable={stylelable}
              styleinup={styleinput}
              onChange={handleChange}
              defaultValue={data ? data.email : ""}
              type="email"
              label="Email"
            />
            <SimpelUserInput
              key={4}
              name="address"
              stylelable={stylelable}
              styleinup={styleinput}
              onChange={handleChange}
              defaultValue={data ? data.address : ""}
              type="text"
              label="Address"
            />
        
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
