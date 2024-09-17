import React, { useContext, useState, useMemo } from "react";
import HeadRow from "./headTable/HeadRow";
import BodyRow from "./bodyTable/BodyRow";
import HeaderTable from "./TableUtils/HeaderTable";
import { CrudContext } from "../../../../../contexts/CrudContext";
import SimpelUserForm from "./AddUser/SimpelUserForm";
import Pagination from "../../../../common/Pagination";
import Search from "./TableUtils/Search";
import Loading from "../../../../../util/Loading";

export default function Table() {
  const { table, oldUser, isLoading } = useContext(CrudContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [tablePerPage] = useState(4);

  const filteredData = useMemo(() => {
    if (!searchTerm) return table;
    return table.filter(
      (data) =>
        data.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        data.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, table]);

  const indexOfLastItem = currentPage * tablePerPage;
  const indexOfFirstItem = indexOfLastItem - tablePerPage;
  const currentList = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading || !table || table.length === 0) {
    return (
      <div className="flex justify-center items-center h-[50%]">
        <Loading />
      </div>
    );
  }

  const headers = Object.keys(table[0]);

  return (
    <>
      <div id="page" className="h-[80vh] flex w-full flex-col">
        <div className="w-full">
          <div className="flex justify-between items-center w-[80%] mx-auto mb-5">
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <HeaderTable />
          </div>
          <div className="my_table">
            <table className="w-[80%] mx-auto min-w-max table-auto text-left">
              <thead>
                <HeadRow data={headers} />
              </thead>
              <tbody>
                <BodyRow
                  data={currentList}
                  keys={headers}
                  filteredData={filteredData}
                />
              </tbody>
            </table>
          </div>
        </div>
        <SimpelUserForm data={oldUser} />
        <div className="w-full flex justify-center mt-4">
          {filteredData && (
            <Pagination
              tablePerPage={tablePerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalTable={filteredData.length}
            />
          )}
        </div>
      </div>
    </>
  );
}
