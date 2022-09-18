import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://api.prodigyio.com:9001/',
});

const jsonify = (resp) => resp.data;

const fetcher = (url) => instance.get(url).then(jsonify);

export { instance as api, fetcher };
