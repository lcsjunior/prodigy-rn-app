function useProvideGlobal({
  alertDialogRef,
  confirmationDialogRef,
  progressDialogRef,
}) {
  const alert = (config) => alertDialogRef.current.alert(config);
  const confirm = (config) => confirmationDialogRef.current.confirm(config);
  const progress = {
    show: () => progressDialogRef.current.show(),
    hide: () => progressDialogRef.current.hide(),
  };

  return {
    alert,
    confirm,
    progress,
  };
}

export { useProvideGlobal };
