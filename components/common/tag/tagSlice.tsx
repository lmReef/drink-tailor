import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  activeTags: string[];
}

const initialState: stateInterface = {
  activeTags: [],
};

export const tagSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTag: (state, action) => {
      state.activeTags.push(action.payload);
    },
    removeTag: (state, action) => {
      state.activeTags = state.activeTags.filter(
        (tag) => tag !== action.payload,
      );
    },
    clearTags: (state) => {
      state.activeTags = [];
    },
  },
});

export const { addTag, removeTag, clearTags } = tagSlice.actions;
export const selectAllTags = (state): string[] => state.tags.activeTags;
export const selectTag = (state, name): boolean =>
  !!state.tags.activeTags.find((tag) => tag === name) || false;
export default tagSlice.reducer;
