import React from 'react'
import { Amount, Token } from 'types/Treasure.types'
import TokenIcon from '@components/TokenIcon'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  select: {
    color: 'white',
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    maxWidth: 80,
    width: 80,
  },
  icon: {
    fill: 'white',
  },
  menu: {
    backgroundColor: '#1E272E',
  },
}))

function AmountInput({
  amount,
  handleQuantityChange,
  handleTokenChange,
}: {
  amount: Amount
  handleQuantityChange: (event: any) => void
  handleTokenChange: (event: any) => void
}) {
  const classes = useStyles()

  return (
    <div className="flex flex-row ml-4 mt-4" style={{ height: 32 }}>
      <TokenIcon token={amount.token} />
      <div className="text-white font-medium text-lg pl-4">
        <Select
          value={amount.token}
          onChange={handleTokenChange}
          className={classes.select}
          inputProps={{
            classes: {
              icon: classes.icon,
            },
          }}
          MenuProps={{
            classes: { list: classes.menu },
          }}
        >
          {Object.keys(Token).map((key) => (
            <MenuItem
              value={Token[key]}
              key={key}
              style={{ color: 'white', backgroundColor: '#1E272E' }}
            >
              {Token[key]}
            </MenuItem>
          ))}
        </Select>
      </div>
      <input
        className="w-2/5 py-1 px-2 text-white text-right leading-tight focus:outline-none"
        type="text"
        placeholder="1000.00"
        style={{ background: 'transparent' }}
        value={amount.quantity ?? ''}
        onChange={handleQuantityChange}
      />
    </div>
  )
}

export default AmountInput
