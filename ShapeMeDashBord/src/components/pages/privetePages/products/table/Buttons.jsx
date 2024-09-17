import React, { useState } from "react";

function Buttons({ value , styles, onClick }) {
;
return(
  <button className={styles} onClick={onClick}>{value}</button>
);
}

export default Buttons;
