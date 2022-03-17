import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  activeTags: string[];
}

const initialState: stateInterface = {
  activeTags: [],
};

export const tagsSlice = createSlice({
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

export const { addTag, removeTag, clearTags } = tagsSlice.actions;
export const selectAllTags = (state) => state.tags.activeTags;
export const selectTag = (state, action) =>
  state.tags.activeTags.find((tag) => tag === action.payload);
export default tagsSlice.reducer;
