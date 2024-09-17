import React, { useContext } from "react";
import Buttons from "../../../products/table/Buttons";
import { blueBtn } from "../../../products/table/styles/ButtonStyles";
import { CrudContext } from "../../../../../../contexts/CrudContext";

function HeaderTable() {
  const { setOldUser } = useContext(CrudContext);
  
  return (
    <div className="text-right">
      <Buttons
        styles={blueBtn}
        value="Add"
        onClick={() => {
          setOldUser(null);
          console.log("Added");
          document.getElementById("table_modal").showModal();
        }}
      />
    </div>
  );
}

export default HeaderTable;
