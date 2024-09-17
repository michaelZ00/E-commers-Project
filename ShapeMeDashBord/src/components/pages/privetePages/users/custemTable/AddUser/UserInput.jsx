import React from "react";

function UserInput({
  handleId,
  name,
  label,
  styleinup,
  stylelable,
  defaultValue,
  ...props
}) {
  const id = "id";
  return (
    <div>
      <label className={stylelable} htmlFor={name}>
        {label}
      </label>
      {name !== id && (
        <input
          id={name}
          name={name}
          {...props}
          defaultValue={defaultValue}
          className={styleinup}
        />
      )}
    </div>
  );
}

export default UserInput;
