import { Axios } from 'axios';
import { setup } from 'axios-cache-adapter';

// local storage:
// https://www.npmjs.com/package/localforage

const api: Axios = setup({
  cache: {
    maxAge: 60 * 60 * 24 * 1000,
    exclude: {
      query: false,
      paths: [/\/api\/get\/random-drinks/],
    },
  },
});

export default api;
