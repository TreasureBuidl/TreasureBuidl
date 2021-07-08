type TreasureModalHeaderProps = {
  treasureAddress: string
  toggle: () => void
}

export default function TreasureModalHeader({
  treasureAddress,
  toggle,
}: TreasureModalHeaderProps) {
  return (
    <div className="flex flex-row items-center mb-10 justify-between">
      <div className="flex flex-row items-center">
        <h2 className="text-xl uppercase mr-2">Treasure</h2>
      </div>

      <div className="mr-5">{treasureAddress}</div>
      <div>
        <div
          onClick={() => toggle()}
          className="w-10 transform rotate-45 text-5xl cursor-pointer align-right"
        >
          +
        </div>
      </div>
    </div>
  )
}
