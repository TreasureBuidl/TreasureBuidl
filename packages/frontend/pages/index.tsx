import DragNDropExample from '@components/DragNDropExample'

export default function Home() {
  return (
    <div className="flex flex-col justify-center p-20">
      <h1>TreasureBuidl</h1>
      <div className="w-60">
        <DragNDropExample />
      </div>
    </div>
  )
}
