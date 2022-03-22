import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import tagSlice from '../components/common/tags/tagSlice';
import themeSlice from '../styles/themeSlice';

export function makeStore() {
  return configureStore({
    reducer: { theme: themeSlice, tags: tagSlice },
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
