import { button } from "@material-tailwind/react";
import React from "react";



function Buttons({ type ,value, styles, onClick }) {
  
  return (
    <button type={type} className={styles} onClick={onClick}>
      {value}
    </button>
  );
}

export default Buttons;
