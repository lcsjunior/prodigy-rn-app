import { baseApi } from '@libs/base-api';
import useSWR from 'swr';

const useWidget = (chId, id) => {
  const {
    data: widget,
    error,
    mutate,
  } = useSWR(chId ? `/widgets/${id}?chId=${chId}` : null);

  const createWidget = async (values) => {
    const { data: newWidget } = await baseApi.post(`/widgets?chId=${chId}`, {
      ...values,
      fields: values.fields.split(','),
    });
    return newWidget;
  };

  const updateWidget = async (values) => {
    const { data: updatedWidget } = await baseApi.patch(
      `/widgets/${id}?chId=${chId}`,
      {
        ...values,
        fields: values.fields.split(','),
      }
    );
    return mutate(updatedWidget);
  };

  const deleteWidget = () => {
    baseApi.delete(`/widgets/${id}?chId=${chId}`);
    return mutate(null);
  };

  return {
    widget,
    isLoading: !error && !widget,
    createWidget,
    updateWidget,
    deleteWidget,
  };
};

export { useWidget };
