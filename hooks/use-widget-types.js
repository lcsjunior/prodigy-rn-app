import useSWRNative from '@nandorojo/swr-react-native';

const useWidgetTypes = (chId) => {
  const { data: types, error } = useSWRNative('/widget-types');

  return {
    types,
    isLoading: !error && !types,
  };
};

export { useWidgetTypes };
