import { ConfirmationDialog } from '@components/ConfirmationDialog';
import { ProgressDialog } from '@components/ProgressDialog';
import { useProvideGlobal } from '@hooks/use-provide-global';
import { createContext, useRef } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const confirmationDialogRef = useRef(null);
  const progressDialogRef = useRef(null);
  const global = useProvideGlobal({
    confirmationDialogRef,
    progressDialogRef,
  });

  return (
    <GlobalContext.Provider value={global}>
      {children}
      <ConfirmationDialog ref={confirmationDialogRef} />
      <ProgressDialog ref={progressDialogRef} />
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
