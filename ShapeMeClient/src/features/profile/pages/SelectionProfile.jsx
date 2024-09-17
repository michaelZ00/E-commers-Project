import React from "react";

function SelectionProfile({handleSelectChange, value}) {

  return (
    <div>
      <select onChange={handleSelectChange} value={value}>
        <option value="favorites">Favorites</option>
        <option value="cart">Cart</option>
      </select>
    </div>
  );
}

export default SelectionProfile;
