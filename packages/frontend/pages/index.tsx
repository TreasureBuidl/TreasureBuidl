import NavBar from '@components/NavBar'
import ActionsRow from '@components/ActionsRow'
import Button, {
  ButtonSize,
  ButtonType,
  ButtonShape,
} from '@components/Button/Button'
import React from 'react'
import ActionModal from '@components/ActionModal/ActionModal'
import { useState } from 'react'
import useTreasure from 'hooks/useTreasure'

export default function Home() {
  const [actionModalState, setActionModalState] = useState(false)
  const { actions } = useTreasure()

  const computeWidth = () => {
    if (!actions.length) {
      return '50%'
    }

    const buttonWidth = 96
    return 295 * actions.length + buttonWidth
  }

  return (
    <div className="bg-darkBlue h-screen w-screen">
      {actionModalState ? (
        <ActionModal toggleActionModal={setActionModalState} />
      ) : (
        ''
      )}
      <NavBar />
      <div className="flex flex-row justify-center mt-48">
        <div className="flex flex-row w-5/6 items-center scrollbar scrollbar-thumb-offWhite scrollbar-track-darkerBlue pb-12"
          style={{ height: 501 }}>
          <ActionsRow style={{ minWidth: computeWidth() }}/>
          <div className="mt-14">
            <Button
              size={ButtonSize.ExtraLarge}
              buttonType={ButtonType.Primary}
              buttonShape={ButtonShape.Circular}
              onClick={() => setActionModalState(true)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
