import React from "react";

function Pagination({ tablePerPage, currentPage, setCurrentPage, totalTable }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTable / tablePerPage); i++)
    pageNumbers.push(i);

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(pageNumbers.length);
  };

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center w-[50%] mx-auto ">
      <ul className="flex gap-5">
        <li>
          <button
            className="bg-transparent border border-white p-2.5 rounded"
            onClick={handleFirstPage}
            disabled={currentPage === 1}
          >
            First
          </button>
        </li>
        <li>
          <button
            className="bg-transparent border border-white p-2.5 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              className={`${
                currentPage === number
                  ? "bg-blue-500"
                  : "bg-transparent border border-white"
              } p-2.5 rounded`}
              onClick={() => setCurrentPage(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            className="bg-transparent border border-white p-2.5 rounded"
            onClick={handleNextPage}
            disabled={currentPage === pageNumbers.length}
          >
            &raquo;
          </button>
        </li>
        <li>
          <button
            className="bg-transparent border border-white p-2.5 rounded"
            onClick={handleLastPage}
            disabled={currentPage === pageNumbers.length}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
