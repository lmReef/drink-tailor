import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'dark',
  },
  reducers: {
    changeTheme: (state) => {
      state.value = state.value === 'dark' ? 'light' : 'dark';
      console.log(state.value);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.value;
export default themeSlice.reducer;
