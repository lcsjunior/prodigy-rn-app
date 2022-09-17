import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://4a9e-2804-d45-ce9d-f700-9255-8a21-c0b3-d634.sa.ngrok.io/',
});

const jsonify = (resp) => resp.data;

const fetcher = (url) => instance.get(url).then(jsonify);

export { instance as api, fetcher };
