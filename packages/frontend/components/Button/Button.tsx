import classnames from 'classnames'
import { Protocol } from 'types/Treasure.types'

export enum ButtonShape {
  Regular,
  Circular,
  Wide,
}

export enum ButtonType {
  Primary = 'Primary',
}

export enum ButtonSize {
  Small,
  Large,
  ExtraLarge,
}

type ButtonProps = {
  size: ButtonSize
  protocolCssClass: string
  buttonShape?: ButtonShape
  onClick?: (any) => any
  children: any
}

function Button({
  size,
  protocolCssClass,
  buttonShape = ButtonShape.Regular,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classnames('text-white py-2 px-4 rounded-lg', {
        'rounded-full w-24 h-24': buttonShape === ButtonShape.Circular,
        'w-40': buttonShape === ButtonShape.Wide,
        'text-xs font-bold': size === ButtonSize.Small,
        'text-xl': size === ButtonSize.Large,
        'text-4xl': size === ButtonSize.ExtraLarge,
      }, protocolCssClass === ButtonType.Primary ? 'bg-purple hover:bg-purple-dark active:bg-purple-darker' : `${protocolCssClass} hover:${protocolCssClass}-dark active:${protocolCssClass}-darker`)}
    >
      {children}
    </button>
  )
}

export default Button
