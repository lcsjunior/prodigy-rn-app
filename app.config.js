module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      baseApiUrl: 'http://api.prodigyio.com:9001',
      thingSpeakApiUrl: 'https://api.thingspeak.com',
    },
  };
};
