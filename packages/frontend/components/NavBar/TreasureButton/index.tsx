import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useTreasureModal from 'hooks/useTreasureModal'
import useEthers from 'hooks/useEthers'

function TreasureButton() {
  const { toggle } = useTreasureModal()
  const { address, treasureAddress, writeContracts, tx, loadTreasureAddress } = useEthers()

  const getShortenedAddress = () => {
    return `${treasureAddress.substring(0, 6)}...${treasureAddress.slice(-4)}`
  }

  const generateTreasure = async () => {
    const result = tx(writeContracts.PlanetFactory.createTreasurePlanet(), update => {
      console.log("📡 Transaction Update:", update);
      if (update && (update.status === "confirmed" || update.status === 1)) {
        console.log(" 🍾 Transaction " + update.hash + " finished!");
        console.log(
          " ⛽️ " +
            update.gasUsed +
            "/" +
            (update.gasLimit || update.gas) +
            " @ " +
            parseFloat(update.gasPrice) / 1000000000 +
            " gwei",
        );
      }
    });
    console.log("awaiting metamask/web3 confirm result...", result);
    console.log(await result);
    loadTreasureAddress(writeContracts, address, tx)
  }

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={treasureAddress ? toggle : generateTreasure}
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
