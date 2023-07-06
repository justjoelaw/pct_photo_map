import React from 'react';
import className from 'classnames';

const FlexContainer = ({ children, primary, ...rest }) => {
  const classes = className(rest.className, 'flex flex-col', {
    'bg-slate-200 bg-opacity-80 inline mx-10 rounded-lg p-5 border-black border-2': primary,
  });
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default FlexContainer;
