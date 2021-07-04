import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useTreasureModal from 'hooks/useTreasureModal'
import useEthers from 'hooks/useEthers'

function TreasureButton() {
  const { toggle } = useTreasureModal()
  const { treasureAddress } = useEthers()

  const getShortenedAddress = () => {
    return `${treasureAddress.substring(0, 6)}...${treasureAddress.slice(-4)}`
  }

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={toggle}
    >
      <div className="flex flex-row items-center" style={{ minWidth: 168 }}>
        <div
          className="bg-no-repeat bg-center mr-4"
          style={{
            backgroundImage: 'url(/images/icons/treasureIconPurple.png)',
            width: 42,
            height: 42,
          }}
        ></div>
        <span className="pb-1">{treasureAddress ? getShortenedAddress() : 'GENERATE'}</span>
      </div>
    </Button>
  )
}

export default TreasureButton
