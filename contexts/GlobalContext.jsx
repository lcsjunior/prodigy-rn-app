import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { useProvideGlobal } from '@hooks/use-provide-global';
import { createContext, useRef } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const confirmationDialogRef = useRef(null);
  const global = useProvideGlobal({
    confirmationDialogRef,
  });

  return (
    <GlobalContext.Provider value={global}>
      {children}
      <ConfirmationDialog ref={confirmationDialogRef} />
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
