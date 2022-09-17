import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://192.168.100.21:4002/',
});

const jsonify = (resp) => resp.data;

const fetcher = (url) => instance.get(url).then(jsonify);

export { instance as api, fetcher };
