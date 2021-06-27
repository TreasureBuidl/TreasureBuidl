import classnames from 'classnames';

export enum ButtonType {
  Primary
}

export enum ButtonSize {
  Small,
  Large
}

type ButtonProps = {
  size: ButtonSize,
  buttonType: ButtonType,
  children: any
}

function Button ({size, buttonType, children}: ButtonProps) {
    return (
      <button className={classnames('text-white py-2 px-4 rounded-lg', {
        "text-xs": size === ButtonSize.Small,
        "text-xl": size === ButtonSize.Large,
        "bg-purple hover:bg-purple-dark active:bg-purple-darker": buttonType === ButtonType.Primary
        })}>
          {children}
      </button>
    )
};

export default Button;
