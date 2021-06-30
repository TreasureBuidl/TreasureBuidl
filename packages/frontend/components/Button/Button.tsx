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
  buttonType: ButtonType | Protocol
  buttonShape?: ButtonShape
  onClick?: () => void
  children: any
}

function Button({
  size,
  buttonType,
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
        'text-xs': size === ButtonSize.Small,
        'text-xl': size === ButtonSize.Large,
        'text-4xl': size === ButtonSize.ExtraLarge,
        'bg-purple hover:bg-purple-dark active:bg-purple-darker':
          buttonType === ButtonType.Primary,
        'bg-aave': buttonType === Protocol.Aave,
        'bg-compound': buttonType === Protocol.Compound,
        'bg-uniswap': buttonType === Protocol.Uniswap,
      })}
    >
      {children}
    </button>
  )
}

export default Button
