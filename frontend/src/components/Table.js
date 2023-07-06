import className from 'classnames';

function Table({ colNames = [], tableRows = [], ...rest }) {
  const classes = className(rest.className, 'table-auto border-2 border-slate-600', {});

  const colNameContent = colNames.map((colName) => {
    return <th>{colName}</th>;
  });

  return (
    <table {...rest} className={classes}>
      <thead>
        <tr>{colNameContent}</tr>
      </thead>
      <tbody className='border-2 border-slate-600'>{tableRows}</tbody>
    </table>
  );
}

export default Table;
