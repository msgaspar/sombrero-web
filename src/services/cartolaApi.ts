import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.cartolafc.globo.com',
});

export default api;
