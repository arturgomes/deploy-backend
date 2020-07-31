import axios from 'axios';
import { getToken } from "./auth";


const api = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://api.couponfeed.co',
  withCredentials: true,
  crossorigin:true
  // headers: {                  
  //   "Access-Control-Allow-Origin": "http://localhost:3001",
  //   // "Access-Control-Allow-Origin": "https://couponfeed.co/",
  //   "Access-Control-Allow-Headers": "Authorization", 
  //   "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE" ,
  //   "Content-Type": "application/json;charset=UTF-8"                   
  // },
  
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.couponfeed.co',
});


api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;