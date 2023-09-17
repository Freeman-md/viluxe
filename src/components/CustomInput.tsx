import React from 'react';
import { useField, FieldAttributes } from 'formik';

interface CustomInputProps extends FieldAttributes<any> {
  label: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, ...props }) => {
  const [field, meta] = useField({
    ...props,
    name: props.name || '', // Ensure 'name' is provided
  });

  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="form-control w-full" {...field} {...props} />
      {meta.touched && meta.error ? (
        <small className="text-red-500 lowercase">{meta.error}</small>
      ) : null}
    </div>
  );
};

export default CustomInput;
