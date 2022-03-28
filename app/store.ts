import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tagSlice from '../components/common/tags/tagSlice';
import favouritesSlice from '../components/favouritesSlice';
import themeSlice from '../styles/themeSlice';
import drinksSlice from '../components/content/drinksSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      theme: themeSlice,
      tags: tagSlice,
      favs: favouritesSlice,
      drinks: drinksSlice,
    },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
