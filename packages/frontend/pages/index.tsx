import NavBar from '@components/NavBar'
import FromToTreasure from '@components/FromToTreasure'
import ActionsRow from '@components/ActionsRow'
import Button, {
  ButtonSize,
  ButtonType,
  ButtonShape,
} from '@components/Button/Button'
import React from 'react'
import ActionModal from '@components/ActionModal/ActionModal'
import { useState } from 'react'
import TreasureModal from '@components/TrasureModal/TreasureModal'
import useTreasureModal from 'hooks/useTreasureModal'
import useTreasure from 'hooks/useTreasure'
import CreateButton from '@components/CreateButton'

export default function Home() {
  const [actionModalState, setActionModalState] = useState(false)
  const { isShowing, toggle } = useTreasureModal()
  const { actions } = useTreasure()

  return (
    <div className="bg-darkBlue h-screen w-screen font-display">
      {actionModalState ? (
        <ActionModal toggleActionModal={setActionModalState} />
      ) : (
        ''
      )}
      {isShowing ? <TreasureModal toggle={toggle} /> : ''}

      <NavBar />
      <div className="flex justify-center mt-12">
        <FromToTreasure />
      </div>
      <div className="flex flex-row justify-center mt-12">
        <div
          className="flex flex-row w-5/6 items-center scrollbar scrollbar-thumb-offWhite scrollbar-track-darkerBlue pb-12"
          style={{ height: 501 }}
        >
          <ActionsRow />
          <div className="mt-14">
            <Button
              size={ButtonSize.ExtraLarge}
              protocolCssClass={ButtonType.Primary}
              buttonShape={ButtonShape.Circular}
              onClick={() => setActionModalState(true)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
      {actions && actions.length && (
        <div className="flex justify-center mt-2">
          <CreateButton />
        </div>
      )}
    </div>
  )
}
