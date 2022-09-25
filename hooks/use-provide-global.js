function useProvideGlobal({ confirmationDialogRef, progressDialogRef }) {
  const confirm = (config) => confirmationDialogRef.current.confirm(config);

  const progressDialog = {
    show: () => progressDialogRef.current.show(),
    hide: () => progressDialogRef.current.hide(),
  };

  return {
    confirm,
    progressDialog,
  };
}

export { useProvideGlobal };
