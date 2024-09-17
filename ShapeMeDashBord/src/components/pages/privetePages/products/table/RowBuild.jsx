import React from 'react'
import { Card, Typography } from "@material-tailwind/react";
function RowBuild({value, ma}) {
  return (
    <td className="p-4" key={ma}>
    <Typography variant="small" color="blue-gray" className="font-normal">
      {value}
      
    </Typography>
  </td>
  )
}

export default RowBuild