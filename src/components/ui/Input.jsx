import React from 'react';

export const Input = (props) => {
  return (
    <div className={`flex flex-col w-fit gap-1 flex-1`}>
      <label htmlFor={props.name} className={`text-gray-800 text-sm`}>
        {props.label}
      </label>
      <input
        type={props.type} name={props.name} id={props.name}
        className={`border border-1 outline-none rounded ps-4 pe-3 py-2 hover:border-blue-500 focus:border-blue-700`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        disabled={props.disabled}
      />
    </div>
  );
};
