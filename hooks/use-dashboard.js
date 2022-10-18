import useSWR from 'swr';

const useDashboard = (id) => {
  const { data: panel, error } = useSWR(`/dashboard/${id}`);

  return {
    panel,
    isLoading: !error && !panel,
  };
};

export { useDashboard };
