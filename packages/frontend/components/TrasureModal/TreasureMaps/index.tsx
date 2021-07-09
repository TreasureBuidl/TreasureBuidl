import Button, {
  ButtonShape,
  ButtonSize,
  ButtonType,
} from '@components/Button/Button'
import useEthers from 'hooks/useEthers'

type TreasureMapsProps = {
  treasureMaps: string[]
}

export default function TreasureMaps({ treasureMaps }: TreasureMapsProps) {
  const { writeContracts, tx } = useEthers()

  const executeTreasureMap = async (mapId: string) => {
    const result = tx(writeContracts.TreasurePlanet.execute(mapId), update => {
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
    <div className="mt-10">
      <h1 className="text-white text-xl mb-4">PREVIOUSLY CREATED</h1>
      <div className="bg-darkerBlue p-16 text-white flex flex-col justify-center items-center border-white border-2 mb-20">
        {treasureMaps.length ? (
          <div className="flex flex-col mb-4">
            {treasureMaps.map((map) => (
              <div className="flex flex-row mb-2" key={map}>
                <div className="mr-4 self-center" style={{ minWidth: 50 }}>{map}</div>
                <Button
                  protocolCssClass={ButtonType.Primary}
                  size={ButtonSize.Small}
                  buttonShape={ButtonShape.Regular}
                  onClick={() => {
                    executeTreasureMap(map)
                  }}
                >
                  EXECUTE
                </Button>
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
