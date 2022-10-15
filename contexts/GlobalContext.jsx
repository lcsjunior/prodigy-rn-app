import {
  AlertDialog,
  ConfirmationDialog,
  ProgressDialog,
} from '@components/Dialog';
import { useProvideGlobal } from '@hooks/use-provide-global';
import { createContext, useRef } from 'react';

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const alertDialogRef = useRef(null);
  const confirmationDialogRef = useRef(null);
  const progressDialogRef = useRef(null);

  const global = useProvideGlobal({
    alertDialogRef,
    confirmationDialogRef,
    progressDialogRef,
  });

  return (
    <GlobalContext.Provider value={global}>
      {children}
      <AlertDialog ref={alertDialogRef} />
      <ConfirmationDialog ref={confirmationDialogRef} />
      <ProgressDialog ref={progressDialogRef} />
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
