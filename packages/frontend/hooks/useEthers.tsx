import { useContext } from 'react';
import { EthersContext } from '../contexts/EthersContext';

const useEthers = () => useContext(EthersContext);

export default useEthers;
