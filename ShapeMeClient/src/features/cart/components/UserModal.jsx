import React from 'react'
import Login from '../../auth/components/Login'
import { AuthContext } from '../../auth/contexts/AuthContext'
import { useContext } from 'react'
import Signup from '../../auth/components/Signup'

function UserModal() {
  const {isUser, setIsUser} = useContext(AuthContext)
  return (
    <div>{/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="my_modal_1" className="modal rounded-lg ">
    <div className="flex justify-center  bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 border-2 border-blue-500">

      <div className="modal-box  space-y-4 md:space-y-6 sm:p-8">
       {/* / <h3 className="font-bold text-lg">Hello!</h3> */}
        {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
        <div className="modal-action flex justify-center">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            {isUser? <Login moveTo={""}/> : <Signup moveTo={""}/>}
            <button className="btn absolute top-2 right-5">X</button>
          </form>
        </div>
      </div>
      </div>
    </dialog></div>
  )
}

export default UserModal