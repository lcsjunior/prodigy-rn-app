import { createContext } from 'react';

const DashboardContext = createContext();

function DashboardProvider({ children, value }) {
  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export { DashboardContext, DashboardProvider };
