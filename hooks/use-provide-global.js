function useProvideGlobal({
  alertDialogRef,
  confirmationDialogRef,
  progressDialogRef,
}) {
  const alert = (config) => alertDialogRef.current.alert(config);
  const confirm = (config) => confirmationDialogRef.current.confirm(config);

  const progressDialog = {
    show: () => progressDialogRef.current.show(),
    hide: () => progressDialogRef.current.hide(),
  };

  return {
    alert,
    confirm,
    progressDialog,
  };
}

export { useProvideGlobal };
