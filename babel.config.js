module.exports = (api) => {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@assets': './assets',
            '@components': './components',
            '@contexts': './contexts',
            '@core': './core',
            '@navigation': './navigation',
            '@screens': './screens',
            '@hooks': './hooks',
            '@providers': './providers',
            '@utils': './utils',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
