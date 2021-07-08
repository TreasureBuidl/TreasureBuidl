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
      <div></div>
      <div className="text-white text-2xl">{treasureAddress}</div>
      <div>
        <div
          onClick={() => toggle()}
          className="ml-8 w-10 transform rotate-45 text-5xl cursor-pointer align-right"
        >
          +
        </div>
      </div>
    </div>
  )
}
