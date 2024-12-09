import Axios from 'axios';

const url = new URL('/api', import.meta.env.VITE_APP_BACKEND_URL);

console.log(url);

export const $axios = Axios.create({
  baseURL: url.toString(),
  headers: {
    'Content-Type': 'application/json',
  },
});