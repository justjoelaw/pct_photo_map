import className from 'classnames';

function TableRow({ children, ...rest }) {
  const classes = className(rest.className, 'border-2 border-slate-600');

  return (
    <tr {...rest} className={classes}>
      {children}
    </tr>
  );
}

export default TableRow;
