import { GlobalContext } from '@contexts/GlobalContext';
import { useContext } from 'react';

const useGlobal = () => {
  return useContext(GlobalContext);
};

export { useGlobal };
