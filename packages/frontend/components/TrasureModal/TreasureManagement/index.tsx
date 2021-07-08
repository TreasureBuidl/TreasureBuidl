import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'

import TreasureModalHeader from '../TreasureModalHeader'
import TreasureAmounts from '../TreasureAmounts'

type TreasureManagementProps = {
  treasureAddress: string
  actualTreasureAmounts
  toggle: () => void
}

export default function TreasureManagement({
  treasureAddress,
  actualTreasureAmounts,
  toggle,
}: TreasureManagementProps) {
  return (
    <div>
      <TreasureModalHeader treasureAddress={treasureAddress} toggle={toggle} />
      <h3 className="text-white font-semibold pb-4">Treasure Management</h3>
      <TreasureAmounts actualTreasureAmounts={actualTreasureAmounts} />
      <div className="flex flex-row justify-center space-x-4">
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          Deposit
        </Button>
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          Withdraw
        </Button>
      </div>
    </div>
  )
}
