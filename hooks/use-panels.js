import { baseApi } from '@libs/base-api';
import useSWR from 'swr';
import _ from 'lodash';

const usePanels = (id) => {
  const { data: panels, mutate: mutatePanels, error } = useSWR('/panels');
  const panel = _.find(panels, { id });

  const createPanel = (values) => {
    return mutatePanels(
      async () => {
        const { data: newPanel } = await baseApi.post('/panels', values);
        return [...panels, newPanel];
      },
      { revalidate: false }
    );
  };

  const bulkUpdatePanel = (values) => {
    return mutatePanels(
      () => {
        const records = values.map((val) => ({
          id: val.id,
        }));
        baseApi.patch('/panels/bulk', records);
        return values;
      },
      { revalidate: false }
    );
  };

  const updatePanel = (values) => {
    return mutatePanels(
      async () => {
        const { data: updatedPanel } = await baseApi.patch(
          `/panels/${id}`,
          values
        );
        const filtered = panels.filter((item) => item.id !== id);
        return _.orderBy([...filtered, updatedPanel], 'sortOrder');
      },
      { revalidate: false }
    );
  };

  const deletePanel = () => {
    return mutatePanels(
      async () => {
        await baseApi.delete(`/panels/${id}`);
        const filtered = panels.filter((item) => item.id !== id);
        return filtered;
      },
      { revalidate: false }
    );
  };

  return {
    panels,
    panel,
    isLoading: !error && !panels,
    createPanel,
    bulkUpdatePanel,
    updatePanel,
    deletePanel,
  };
};

export { usePanels };
