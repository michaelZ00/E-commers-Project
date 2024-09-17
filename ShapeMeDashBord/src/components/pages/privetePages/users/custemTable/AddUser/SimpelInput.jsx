import React from "react";

function SimpelUserInput({
  name,
  label,
  styleinup,
  stylelable,
  defaultValue,
  ...props
}) {
  return (
    <div>
      <label className={stylelable} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        {...props}
        defaultValue={defaultValue}
        className={styleinup}
      />
    </div>
  );
}

export default SimpelUserInput;
