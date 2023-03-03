import axios from 'axios';

export const API_URL = 'https://api.sixshop.com';

const API = axios.create({
  baseURL: API_URL,
});

API.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error || 'Something went wrong')
);

export default API;
