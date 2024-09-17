import React, { useContext } from "react";
import Table from "./Table";
import CrudProvider from "../../../../../contexts/CrudContext";


function TableNode() {

  return (
    <div>
      <CrudProvider>
        <Table />
      </CrudProvider>
    </div>
  );
}

export default TableNode;
