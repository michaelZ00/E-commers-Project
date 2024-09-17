import { useContext, useState } from "react"
import React from 'react'
import RowBuild from "../products/table/RowBuild"
import Buttons from "../users/custemTable/TableUtils/Buttons"
import { blueBtn, redBtn ,limeBtn } from "../products/table/styles/ButtonStyles"
import { AuthContext } from "../../../../contexts/AuthContext"
import axios from "axios"
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { VscOpenPreview } from "react-icons/vsc";


// "/updateOrder/:id

function BudyBuildOrders({budy}) {
  const url = `http://localhost:3000/orders/updateOrder`;
const updateOrder = async (obj, status)=> {
    obj.order_status = status

  try {
    const response = await axios(`${url}/${obj._id}`,{
      method:"put",
      withCredentials:true,
      data:obj
    })
  } catch (error) {
    console.log(error)
  }
}
const obj = [
    "waiting",
    "on care",
    "sending",
    "arrive",
    "cancel",
]
const myOptions = obj.map((status,i) => <option key={i} value={i}>{[status]}</option>)

  return (
    <tbody>
    {budy.map((order, index) => (
      <tr key={index} className="even:bg-blue-gray-50/50">
        <RowBuild value={String(order?.order_number)} />
        <RowBuild value={order?.customer_details.name} />
        <RowBuild value={`${order?.customer_details?.city}
                         ${order?.customer_details?.address}
                         `} />
        <RowBuild value={`$${order?.total_price}`} />
        {/* <RowBuild value={obj[order?.order_status]} /> */}
        <td>
        <select onChange={(e)=> updateOrder(order, e.target.value)} id={`status${index}`} defaultValue={obj[order?.order_status]} className="select select-bordered w-5/6 max-w-xs">
        <option hidden>{obj[order?.order_status]}</option>
        {myOptions}
        </select>
        </td>
        <td>
          <Buttons
            styles={blueBtn}
            value={<VscOpenPreview size={20}/>}
            onClick={() => show(order)}
          />
        </td>
      </tr>
    ))}
  </tbody>
  )
}

export default BudyBuildOrders