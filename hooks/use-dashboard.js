import { DashboardContext } from '@contexts/DashboardContext';
import { useContext } from 'react';

const useDashboard = () => {
  return useContext(DashboardContext);
};

export { useDashboard };
