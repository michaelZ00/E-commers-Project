import React from "react";
import { Typography } from "@material-tailwind/react";
export default function HeadRow({ data }) {
  const handleId = (item) =>{
    if(item !== "id"){
      return item;
    }
  }
  
  return (
    <tr key="a">
      {!data ? (
        <h1>is loading.....</h1>
      ) : (
        data?.map((item, i) => (
          <th
            scope="col"
            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            key={i}
          >
            <Typography
              key={i}
              variant="small"
              color="blue-gray"
              className="font-normal leading-none opacity-70"
            >
              {handleId(item)}
            </Typography>
          </th>
        ))
      )}
      <th
        key="c"
        scope="col"
        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
      >
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal leading-none opacity-70"
        >
          Actions
        </Typography>
      </th>
    </tr>
  );
}
