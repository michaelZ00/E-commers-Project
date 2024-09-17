import React from "react";
import { Typography } from "@material-tailwind/react";

function TableField({ id, children }) {

  return (
    <td key={id} className="p-4">
      <Typography variant="small" color="blue-gray" className="font-normal">
        {children}
      </Typography>
    </td>
  );
}

export default TableField;
