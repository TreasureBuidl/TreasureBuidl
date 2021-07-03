import { useContext } from 'react'
import { TreasureModalContext } from '../contexts/TreasureModalContext'

const useTreasureModal = () => useContext(TreasureModalContext)

export default useTreasureModal
