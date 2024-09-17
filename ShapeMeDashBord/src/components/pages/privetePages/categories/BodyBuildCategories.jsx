import { useContext, useState } from "react"
import React from 'react'
import RowBuild from "../products/table/RowBuild"
import Buttons from "../products/table/Buttons"
import { blueBtn, redBtn, limeBtn } from "../products/table/styles/ButtonStyles"
// import { AuthContext } from "../../../../contexts/AuthContext"
import axios from "axios"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";
// import { deleteCategory } from "../../../../../../ShapeMeServer/controllers/CategoriesController"

function BodyBuildCategories({budy, show, deleteCategory}) {

  return (
    <tbody>
    {budy?.map((Category, index) => (
      <tr key={index} className="even:bg-blue-gray-50/50">
        <RowBuild value={Category?.name} />
        <td>

          <Buttons
            styles={limeBtn}
            value={<FaEdit size={20}/>}
            onClick={() => show(Category)}
          />
          <Buttons
            styles={redBtn}
            value={<MdDeleteForever size={20}/>}
            onClick={() => deleteCategory(Category._id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
  )
}

export default BodyBuildCategories