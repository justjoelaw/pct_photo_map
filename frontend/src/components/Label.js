import className from 'classnames';

function Label({ children, inline, normal, small, ...rest }) {
  const classes = className(rest.className, 'font-bold', {
    'w-80': normal,
    'w-40': small,
    'mr-1': inline,
  });

  return (
    <h1 {...rest} className={classes}>
      {children}
    </h1>
  );
}

export default Label;
