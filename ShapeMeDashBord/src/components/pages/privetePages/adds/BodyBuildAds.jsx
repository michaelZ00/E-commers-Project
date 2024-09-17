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
function BodyBuildAds({budy, show, deleteAd}) {


console.log("hey",budy)
  return (
    <tbody>
    {budy?.map((ad, index) => (
      <tr key={index} className="even:bg-blue-gray-50/50 h-[50px]">
        <RowBuild value={ad?.Name} />
        <img src={ad?.Ad} className="max-h-[50px]"/>
        <td>

          <Buttons
            styles={limeBtn}
            value={<FaEdit size={20}/>}
            onClick={() => show(ad)}
          />
          <Buttons
            styles={redBtn}
            value={<MdDeleteForever size={20}/>}
            onClick={() => deleteAd(ad._id)}
          />
        </td>
      </tr>
    ))}
  </tbody>
  )
}
export default BodyBuildAds
