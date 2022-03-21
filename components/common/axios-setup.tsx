import { Axios } from 'axios';
import { setup } from 'axios-cache-adapter';
import localforage from 'localforage';

const forageStore = localforage.createInstance({
  name: 'axios-cache',
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

const api: Axios = setup({
  cache: {
    maxAge: 30 * 60 * 1000,
    store: forageStore,
    exclude: {
      query: false,
    },
  },
});

export default api;
