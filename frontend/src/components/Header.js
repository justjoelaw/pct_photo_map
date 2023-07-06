import className from 'classnames';

function Header({ children, splash, splashSm, navbar, journalEntry, ...rest }) {
  const classes = className(rest.className, {
    'text-4xl font-bold tracking-tight text-gray-900 m-10': splash,
    'text-2xl font-bold tracking-tight text-gray-900 m-10': splashSm,
    'font-bold tracking-tight text-gray-900': navbar,
    'text-lg font-bold tracking-tight text-gray-900': journalEntry,
  });

  return (
    <h1 {...rest} className={classes}>
      {children}
    </h1>
  );
}

export default Header;
