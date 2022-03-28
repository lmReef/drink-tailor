import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  drinks: DrinkBasic[];
}

const initialState: stateInterface = {
  drinks: [],
};

export const drinksSlice = createSlice({
  name: 'drinks',
  initialState,
  reducers: {
    setDrinks: (state, action) => {
      state.drinks = action.payload;
    },
    addDrink: (state, action) => {
      state.drinks.push(action.payload);
    },
    removeDrink: (state, action) => {
      state.drinks = state.drinks.filter((drink) => drink !== action.payload);
    },
    clearDrinks: (state) => {
      state.drinks = [];
    },
  },
});

export const { addDrink, removeDrink, clearDrinks, setDrinks } =
  drinksSlice.actions;

export const selectAllDrinks = (state): DrinkBasic[] => state.drinks.drinks;

export default drinksSlice.reducer;
