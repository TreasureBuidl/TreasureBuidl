import React from 'react'
import useTreasure from '../../hooks/useTreasure'
import ActionCard from './ActionCard'

function ActionsRow() {
  const { actions } = useTreasure()

  return (
    <div className="flex flex-row justify-center">
      {actions.map((action) => {
        return <ActionCard key={action.id} action={action} />
      })}
    </div>
  )
}

export default ActionsRow
