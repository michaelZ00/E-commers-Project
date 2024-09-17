import React, { useContext, useState } from "react";
import TableField from "./TableField";
import Buttons from "../TableUtils/Buttons";
import { limeBtn, redBtn } from "../../../products/table/styles/ButtonStyles";
import { CrudContext } from "../../../../../../contexts/CrudContext";
import axios from "axios";


const url = "http://localhost:3000/managers";

function BodyRow({ data, keys, filteredData }) {
  const { deleteUser, upDataUser } = useContext(CrudContext);
  const resulte = data ? data : filteredData
  const handleId_1 = (obj, key) => {
    if (key === "id") return ""; // Return empty string for "id"
    return obj[key];
  };

  const handleRole = async (e, rowData) => {
    try {
      const role = e.target.value;
      const conformation = confirm("Are you sure you want to change this role");
      if (conformation) {
        const { data } = await axios.put(
          `${url}/upDataRole/${rowData.id}`,
          {
            role,
          },
          { withCredentials: true }
        );

        e.target.value = data.upDatedUser.role;
        
        if (!data.success) {
          throw new Error("Could not update role");
        }
      } else {
        e.target.value = rowData.role;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderField = (rowData, fieldData, key) => {
    if (fieldData === "role") {
      return (
        <TableField key={key} id={key}>
          <select
            value={rowData[fieldData]}
            onChange={(e) => handleRole(e, rowData)}
          >
            <option value="admin">Admin</option>
            <option value="manager">manager</option>
            <option value="regular">regular</option>
          </select>
        </TableField>
      );
    }
    return (
      <TableField key={key} id={key}>
        {handleId_1(rowData, fieldData)}
      </TableField>
    );
  };

  return (
    <>
      {resulte?.map((rowData, i) => (
        <tr key={i} className="even:bg-blue-gray-50/50">
          {keys?.map((fieldData, j) => renderField(rowData, fieldData, j))}
          <td key={`actions-${i}`}>
            <Buttons
              type="button"
              styles={limeBtn}
              value="Edit"
              onClick={() => {
                console.log(rowData);
                upDataUser(rowData);
              }}
            />
            <Buttons
              type="button"
              styles={redBtn}
              value="Delete"
              onClick={() => {
                console.log(rowData);
                deleteUser(rowData);
              }}
            />
          </td>
        </tr>
      ))}
    </>
  );
}

export default BodyRow;
