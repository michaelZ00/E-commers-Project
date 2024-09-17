import React from "react";
import Login from "../../../features/auth/components/Login";
import Sginup from "../../../features/auth/components/Signup";
import { AuthContext } from "../../../features/auth/contexts/AuthContext";
import { useContext } from "react";

function Form() {
  const { isUser } = useContext(AuthContext);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_1" className="modal rounded-lg ">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-500">
          <div className="modal-box p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                {isUser ? <Login  /> : <Sginup  />}
                <button className="btn absolute top-2 right-5">X</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Form;
