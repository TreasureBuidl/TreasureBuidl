import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'
import { TreasureMap } from 'types/Treasure.types'

type TreasureMapsProps = {
  treasureMaps: TreasureMap[]
}

export default function TreasureMaps({ treasureMaps }: TreasureMapsProps) {
  return (
    <div className="mt-10">
      <h3 className="text-white font-semibold mb-4">Treasure Maps</h3>
      <div className="bg-darkerBlue p-16 text-white flex flex-col justify-center items-center  border-white border-2 mb-20">
        {treasureMaps.length ? (
          <div className="flex flex-col mb-4">
            {treasureMaps.map((map) => (
              <div className="flex flex-row mb-2">
                <Button
                  protocolCssClass={ButtonType.Primary}
                  size={ButtonSize.Small}
                  buttonShape={ButtonShape.Regular}
                  onClick={() => {}}
                >
                  Execute
                </Button>
                <div className="ml-4">{map.id}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-white text-lg text-center mt-2">N/A</div>
        )}
      </div>
    </div>
  )
}
