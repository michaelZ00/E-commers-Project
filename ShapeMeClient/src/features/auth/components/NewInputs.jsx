import React from "react";

function NewInputs({
  type,
  label,
  name,
  onChange,
  value,
  onBlur,
  className,
  placeholder,
}) {
  return (
    <div>
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={className}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        placeholder={placeholder}
      />
    </div>
  );
}

export default NewInputs;
