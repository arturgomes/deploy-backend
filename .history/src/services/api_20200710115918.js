import axios from 'axios';
import { getToken } from "./auth";


const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://api.couponfeed.co',
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.couponfeed.co',
  // withCredentials: false, // default

});


api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;