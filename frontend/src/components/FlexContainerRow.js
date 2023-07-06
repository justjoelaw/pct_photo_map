import React from 'react';
import className from 'classnames';

const FlexContainerRow = ({ children, ...rest }) => {
  const classes = className(rest.className, 'flex flex-row');

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default FlexContainerRow;
