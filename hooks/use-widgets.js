import useSWR from 'swr';

const useWidgets = ({ chId }) => {
  const { data: widgets, error } = useSWR(`/widgets?chId=${chId}`, {
    revalidateIfStale: false,
  });

  return {
    widgets,
    isLoading: !error && !widgets,
  };
};

export { useWidgets };
