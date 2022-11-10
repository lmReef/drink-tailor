import { createSlice } from '@reduxjs/toolkit';
import { Volume } from 'convert';

interface stateInterface {
  drinks: DrinkBasic[];
  unit: Volume;
}

const initialState: stateInterface = {
  drinks: [],
  unit: 'ml',
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
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const { addDrink, removeDrink, clearDrinks, setDrinks, setUnit } =
  drinksSlice.actions;

export const selectAllDrinks = (state): DrinkBasic[] => state.drinks.drinks;
export const selectUnit = (state): Volume => state.unit;

export default drinksSlice.reducer;
