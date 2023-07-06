import className from 'classnames';

function TableData({ children, ...rest }) {
  const classes = className(rest.className, 'border-2 border-slate-600');

  return (
    <td {...rest} className={classes}>
      {children}
    </td>
  );
}

export default TableData;
