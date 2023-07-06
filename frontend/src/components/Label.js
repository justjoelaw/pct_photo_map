import className from 'classnames';

function Label({ children, ...rest }) {
  const classes = className(rest.className, 'w-80 font-bold', {});

  return (
    <h1 {...rest} className={classes}>
      {children}
    </h1>
  );
}

export default Label;
