import axios from 'axios';
import { getToken } from "./auth";


const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://api.couponfeed.co',
  // headers: {'Access-Control-Allow-Origin': 'https://www.couponfeed.co'}
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.couponfeed.co',
});

// api.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// api.defaults.headers.post['Access-Control-Allow-Origin'] = 'https://www.couponfeed.co';



api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;