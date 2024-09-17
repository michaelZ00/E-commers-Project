import React from "react";
import { Field, useField } from "formik";



function Input({ ...props }) {
  const { name ,label, styleinup, stylelable } = props;
  // const [field, meta] = useField(name);
  return (
    <div>
      <label className={stylelable} htmlFor={name}>
        {label}
      </label>
      <Field
        {...props}

        className={styleinup}
      />
    </div>
  );
}

export default Input;
