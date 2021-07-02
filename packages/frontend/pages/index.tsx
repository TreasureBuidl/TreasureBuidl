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

export default function Home() {
  const [actionModalState, setActionModalState] = useState(false)

  return (
    <div className="bg-darkBlue h-screen w-screen">
      {actionModalState ? (
        <ActionModal toggleActionModal={setActionModalState} />
      ) : (
        ''
      )}
      <NavBar />
      <div className="flex flex-row justify-center items-center mt-48">
        <div className="w-3/4 overflow-x-scroll">
          <ActionsRow />
        </div>
        <div className="ml-24">
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
  )
}
