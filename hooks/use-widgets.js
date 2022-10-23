import useSWRNative from '@nandorojo/swr-react-native';

const useWidgets = (chId) => {
  const { data: widgets, error } = useSWRNative(
    chId ? `/widgets?chId=${chId}` : null
  );

  const bulkUpdateWidget = (sorted) => {};

  return {
    widgets,
    isLoading: !error && !widgets,
    bulkUpdateWidget,
  };
};

export { useWidgets };
