const defaultParser = {
  parse: {
    id: Number,
  },
};

const config = {
  screens: {
    Settings: 'settings',
    ChannelDetail: {
      path: 'channels/:id',
      ...defaultParser,
    },
    PanelDetail: {
      path: 'panels/:id',
      ...defaultParser,
    },
    NotFound: '*',
  },
};

const linking = {
  prefixes: [],
  config,
};

export { linking };
