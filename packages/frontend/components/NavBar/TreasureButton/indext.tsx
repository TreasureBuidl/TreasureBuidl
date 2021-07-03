import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useTreasureModal from 'hooks/useTreasureModal'

function TreasureButton() {
  const { toggle } = useTreasureModal()
  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={toggle}
    >
      <div className="flex flex-row" style={{ minWidth: 168 }}>
        <div
          className="bg-no-repeat bg-center mr-4"
          style={{
            backgroundImage: 'url(/images/icons/treasureIconPurple.png)',
            width: 72,
            height: 72,
          }}
        ></div>
      </div>
    </Button>
  )
}

export default TreasureButton
