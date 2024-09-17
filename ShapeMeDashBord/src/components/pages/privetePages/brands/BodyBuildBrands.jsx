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
// import { deleteBrand } from "../../../../../../ShapeMeServer/controllers/brandsController"

function BodyBuildBrands({budy, show, deleteBrand}) {

console.log("hey",budy)
  return (
    <tbody>
    {budy?.map((brand, index) => (
      <tr key={index} className="even:bg-blue-gray-50/50">
        <RowBuild value={brand?.Name} />
        <img src={brand?.Logo}/>
        <td>

          <Buttons
            styles={limeBtn}
            value={<FaEdit size={20}/>}
            onClick={() => show(brand)}
          />
          <Buttons
            styles={redBtn}
            value={<MdDeleteForever size={20}/>}
            onClick={() => deleteBrand(brand._id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
  )
}

export default BodyBuildBrands