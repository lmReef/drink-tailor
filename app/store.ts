import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tagsSlice from '../components/side-menu/filter/tagsSlice';
import themeSlice from '../styles/themeSlice';

export function makeStore() {
  return configureStore({
    reducer: { theme: themeSlice, tags: tagsSlice },
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
