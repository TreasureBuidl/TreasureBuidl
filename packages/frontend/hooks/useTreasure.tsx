import { useContext } from 'react';
import { TreasureContext } from '../contexts/TreasureContext';

const useTreasure = () => useContext(TreasureContext);

export default useTreasure;
