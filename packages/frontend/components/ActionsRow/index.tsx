import React from 'react'
import useTreasure from '../../hooks/useTreasure'
import ActionCard from './ActionCard'

function ActionsRow({ style }) {
  const { actions } = useTreasure()

  return (
    <div className="flex flex-row justify-center" style={style}>
      {actions.map((action) => {
        return <ActionCard key={action.id} action={action} />
      })}
    </div>
  )
}

export default ActionsRow
