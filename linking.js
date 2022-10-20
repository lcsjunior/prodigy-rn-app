const defaultParser = {
  parse: {
    id: Number,
  },
};

const config = {
  screens: {
    Settings: {
      path: 'settings',
    },
    ChannelDetail: {
      path: 'channels/:id',
      ...defaultParser,
    },
    Dashboard: {
      path: 'channels/:id/dashboard',
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
