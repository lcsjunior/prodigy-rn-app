import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://192.168.100.21:4002/',
});

export { instance as api };
