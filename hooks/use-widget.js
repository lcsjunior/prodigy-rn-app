import useSWR from 'swr';

const useWidget = (chId, id) => {
  const { data: widget, error } = useSWR(`/widgets/${id}?chId=${chId}`);

  const createWidget = (values) => {};

  const updateWidget = (values) => {};

  const deleteWidget = () => {};

  return {
    widget,
    isLoading: !error && !widget,
    createWidget,
    updateWidget,
    deleteWidget,
  };
};

export { useWidget };
