import React, { useState } from "react";

function Button({ value , styles, onClick }) {
;
return(
  <button className={styles} onClick={onClick}>{value}</button>
);
}



export default Button