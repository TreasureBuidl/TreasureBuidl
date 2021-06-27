import classnames from 'classnames';

function Button ({size, bgColor, textColor, children}) {
    return (
      <button className={classnames(`bg-${bgColor} text-${textColor} py-2 px-4 rounded-lg hover:bg-${bgColor}-dark active:bg-${bgColor}-darker`, {
        "text-xs": size === 'sm',
        "text-xl": size === 'lg'
        })}>
          {children}
      </button>
    )
};

export default Button;
