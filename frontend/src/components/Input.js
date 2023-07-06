import React from 'react';
import className from 'classnames';

const Input = ({ children, textInput, ...rest }) => {
  const classes = className(rest.className, 'rounded-lg border-2 border-slate-600  bg-gray-50', {
    'w-48': textInput,
  });
  return (
    <input {...rest} className={classes}>
      {children}
    </input>
  );
};

export default Input;
