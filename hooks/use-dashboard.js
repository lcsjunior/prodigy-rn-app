import useSWR from 'swr';

const useDashboard = (id) => {
  const {
    data: panel,
    mutate: mutateDashboard,
    error,
  } = useSWR(`/dashboard/${id}`);

  const dispose = () => mutateDashboard(null);

  return {
    panel,
    dispose,
    isLoading: !error && !panel,
  };
};

export { useDashboard };
