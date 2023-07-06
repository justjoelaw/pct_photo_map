import className from 'classnames';

function Button({ children, primary, secondary, success, warning, danger, outline, rounded, large, disabled, ...rest }) {
  const classes = className(rest.className, 'px-3 py-1.5 border flex items-center justify-center', {
    'border-2 border-slate-600 bg-white text-black': primary,
    'border-gray-900 bg-gray-900 text-white': secondary,
    'border-green-500 bg-green-500 text-white': success,
    'border-yellow-500 bg-yellow-500 text-white': warning,
    'border-2 border-slate-600 bg-red-200 text-black': danger,
    'rounded-full': rounded,
    'bg-white': outline,
    'text-blue-500': outline && primary,
    'text-gray-500': outline && secondary,
    'text-green-500': outline && success,
    'text-yellow-500': outline && warning,
    'text-red-500': outline && danger,
    'text-2xl px-20 w-40': large,
    'opacity-50 cursor-not-allowed': disabled,
  });

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
