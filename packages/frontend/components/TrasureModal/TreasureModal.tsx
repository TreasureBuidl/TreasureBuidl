import React from 'react'
import useEthers from 'hooks/useEthers'
import useTreasure from 'hooks/useTreasure'
import TreasureManagement from './TreasureManagement'
import TreasureMaps from './TreasureMaps'

export default function TreasureModal({ toggle }) {
  const { treasureAddress, createdTreasureMaps } = useEthers()
  const { actualTreasureAmounts } = useTreasure()

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="bg-darkBlue border-white border-2 rounded-lg p-5 w-1/2 h-4/5 overflow-y-scroll scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue flex flex-col px-40">
        <TreasureManagement
          toggle={toggle}
          actualTreasureAmounts={actualTreasureAmounts}
          treasureAddress={treasureAddress}
        />
        <TreasureMaps treasureMaps={createdTreasureMaps} />
      </div>
    </div>
  )
}
