import React from 'react'
import { Typography } from "@material-tailwind/react";
function HeadBuild({value, ma, num}) {
  return (
    <th
    key={ma}
    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 "
    >
    <Typography
      variant="small"
      color="blue-gray"
      className="font-normal leading-none opacity-70"
    >
      {value}
    </Typography>
  </th>
  )
}

export default HeadBuild