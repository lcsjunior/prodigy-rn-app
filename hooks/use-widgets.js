import useSWR from 'swr';

const useWidgets = (chId) => {
  const { data: widgets, error } = useSWR(
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
