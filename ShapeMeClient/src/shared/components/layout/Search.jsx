// src/shared/components/layout/Search.jsx
import React from "react";

const Search = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="w-full me-4 text-neutral-600 dark:text-white">
        <input
          id="my-serach"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          style={{
            borderRadius: "1.375rem",
            paddingTop: "4px",
            paddingBottom: "4px",
          }}
          className="w-full px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default Search;
