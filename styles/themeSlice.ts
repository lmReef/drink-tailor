import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    value: 'light',
  },
  reducers: {
    changeTheme: (state, action) => {
      const theme = action?.payload;

      if (theme) state.value = theme;
      else state.value = state.value === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', state.value);
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export const selectTheme = (state) => state.theme.value;
export default themeSlice.reducer;
