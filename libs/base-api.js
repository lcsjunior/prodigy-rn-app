import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.manifest.extra.baseApiUrl,
});

const jsonify = (resp) => resp.data;

const fetcher = (url) => instance.get(url).then(jsonify);

export { instance as api, fetcher };
