import { useContext, useState } from "react"
import React from 'react'
import RowBuild from "../table/RowBuild"
import Buttons from './Buttons'
import { blueBtn, limeBtn, redBtn } from './styles/ButtonStyles'
import { AuthContext } from "../../../../../contexts/AuthContext"
import axios from "axios"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";


function BudyBuild({budy, update, deleteProduct, show}) {



  return (
    <tbody>
    {budy.map((product, index) => (
      <tr key={index} className="even:bg-blue-gray-50/50">
        <RowBuild value={product.product_name} />
        <RowBuild value={product.product_price} />
        <RowBuild value={product.product_amount} />
        <RowBuild value={product.product_brand.Name} />
        <td>
          <Buttons
            styles={limeBtn}
            value={ <FaEdit size={20}/>}
            onClick={() => update(product)}
          />
          <Buttons
            styles={redBtn}
            value={<MdDeleteForever size={20}/>}
            onClick={() => deleteProduct(product)}
          />
          <Buttons
            styles={blueBtn}
            value={<VscOpenPreview size={20}/>}
            onClick={() => show(product)}
          />
        </td>
      </tr>
    ))}
  </tbody>
  )
}

export default BudyBuild