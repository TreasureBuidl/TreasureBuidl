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
      <h3 className="text-white text-xl pb-4">TOKENS</h3>
      <TreasureAmounts actualTreasureAmounts={actualTreasureAmounts} />
      <div className="flex flex-row justify-center space-x-4">
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          DEPOSIT
        </Button>
        <Button
          size={ButtonSize.Large}
          buttonShape={ButtonShape.Wide}
          protocolCssClass={ButtonType.Primary}
          onClick={() => {}}
        >
          WITHDRAW
        </Button>
      </div>
    </div>
  )
}
