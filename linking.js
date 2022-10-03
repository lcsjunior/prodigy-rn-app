import _ from 'lodash';

const config = {
  screens: {
    Settings: 'settings',
    ChannelDetail: {
      path: 'channels/:id',
      parse: {
        id: Number,
      },
    },
    NotFound: '*',
  },
};

const linking = {
  prefixes: [],
  config,
};

export { linking };
