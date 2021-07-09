import React from 'react'
import Button from '@components/Button/Button'
import { ButtonSize, ButtonType } from '@components/Button/Button'
import useEthers from 'hooks/useEthers'

function CreateButton() {
  const { writeContracts, tx } = useEthers()

  const createTreasureMap = async () => {
    const description = 'todo, provide textfield on UI to enter description'
    const targetAddresses = []
    const functionSignatures = []
    const parameters = []
    const callValues = []

    const result = tx(writeContracts.TreasureMaps.createTreasure(description, targetAddresses, functionSignatures, parameters, callValues), update => {
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
  }

  return (
    <Button
      size={ButtonSize.Large}
      protocolCssClass={ButtonType.Primary}
      onClick={createTreasureMap}
    >
      <div className="self-center" style={{ width: 168 }}>
        <span>CREATE</span>
      </div>
    </Button>
  )
}

export default CreateButton
