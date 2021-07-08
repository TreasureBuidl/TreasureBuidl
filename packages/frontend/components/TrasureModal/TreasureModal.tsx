import React from 'react'
import useEthers from 'hooks/useEthers'
import useTreasure from 'hooks/useTreasure'

import TreasureManagement from './TreasureManagement'
import TreasureMaps from './TreasureMaps'

export default function TreasureModal({ toggle }) {
  const { treasureAddress } = useEthers()
  const { actualTreasureAmounts } = useTreasure()
  const treasureMaps = [
    {
      id: '0x3E259685A7b778dE2a8DbdF836659c4011cCAb9e',
    },
    {
      id: '0x3E259685A7b778dE2a8DbdF836659c4011cCAb9e',
    },
  ]

  return (
    <div className="bg-black bg-opacity-75 h-screen w-screen text-white flex justify-center items-center fixed z-10">
      <div className="bg-darkBlue border-white border-2 rounded-lg p-5 w-3/4 h-4/5 overflow-y-scroll scrollbar scrollbar-thumb-offWhite scrollbar-darkBlue flex flex-col px-40">
        <TreasureManagement
          toggle={toggle}
          actualTreasureAmounts={actualTreasureAmounts}
          treasureAddress={treasureAddress}
        />
        <TreasureMaps treasureMaps={treasureMaps} />
      </div>
    </div>
  )
}
