function useProvideGlobal({ confirmationDialogRef }) {
  const confirm = (config) => confirmationDialogRef.current.confirm(config);

  return {
    confirm,
  };
}

export { useProvideGlobal };
