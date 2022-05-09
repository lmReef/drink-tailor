import { createSlice } from '@reduxjs/toolkit';
import { breakpoints_max } from './theme';

interface stateInterface {
  color: 'light' | 'dark';
  isMobile: boolean;
}

const initialState: stateInterface = {
  color: 'light',
  isMobile: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      const theme = action?.payload;

      if (theme) state.color = theme;
      else state.color = state.color === 'dark' ? 'light' : 'dark';

      localStorage.setItem('theme', state.color);
    },
    checkDevice: (state) => {
      state.isMobile = window.matchMedia(
        `(max-width:${breakpoints_max.sm})`,
      ).matches;
    },
  },
});

export const { changeTheme, checkDevice } = themeSlice.actions;
export const selectTheme = (state) => state.theme.color;
export const selectIsMobile = (state) => state.theme.isMobile;
export default themeSlice.reducer;
