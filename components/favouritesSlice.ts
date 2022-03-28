import { createSlice } from '@reduxjs/toolkit';

interface stateInterface {
  favouritesActive: boolean;
  favouriteDrinks: DrinkBasic[];
}

const initialState: stateInterface = {
  favouritesActive: false,
  favouriteDrinks: [],
};

export const favouritesSlice = createSlice({
  name: 'favs',
  initialState,
  reducers: {
    setFavouriteDrinks: (state, action) => {
      state.favouriteDrinks = action.payload;
    },
    addDrink: (state, action) => {
      console.log(state.favouriteDrinks);

      state.favouriteDrinks.push(action.payload);

      localStorage.setItem('favourites', JSON.stringify(state.favouriteDrinks));
    },
    removeDrink: (state, action) => {
      state.favouriteDrinks = state.favouriteDrinks.filter(
        (x) => x.idDrink !== action.payload.idDrink,
      );

      localStorage.setItem('favourites', JSON.stringify(state.favouriteDrinks));
    },
    clearFavouriteDrinks: (state) => {
      state.favouriteDrinks = [];

      localStorage.setItem('favourites', JSON.stringify(state.favouriteDrinks));
    },
    toggleFavouritesActive: (state) => {
      state.favouritesActive = !state.favouritesActive;
    },
    setFavouritesActive: (state, action) => {
      state.favouritesActive = action.payload;
    },
  },
});

export const {
  setFavouriteDrinks,
  addDrink,
  removeDrink,
  clearFavouriteDrinks,
  toggleFavouritesActive,
  setFavouritesActive,
} = favouritesSlice.actions;

export const selectFavouriteDrinks = (state): string[] =>
  state.favs.favouriteDrinks;

export const selectFavourite = (state, find: DrinkBasic): boolean =>
  !!state.favs.favouriteDrinks.find(
    (drink: DrinkBasic) => drink.idDrink === find.idDrink,
  ) || false;

export const selectFavouritesActive = (state): boolean =>
  state.favs.favouritesActive;

export const selectHasFavourites = (state): boolean =>
  state.favs.favouriteDrinks.length > 0;

export default favouritesSlice.reducer;
