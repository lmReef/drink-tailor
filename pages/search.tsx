import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { clearDrinks, setDrinks } from '../components/content/drinksSlice';
import { clearTags } from '../components/common/tags/tagSlice';
import { useRouter } from 'next/router';
import api from '../components/common/axios-setup';

const Search = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // set redux state
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (theme) dispatch(changeTheme(theme));
      if (favourites) dispatch(setFavouriteDrinks(favourites));
    }

    dispatch(clearTags());
  }, [dispatch]);

  useEffect(() => {
    const searchForDrink = async () => {
      const name = router.query.name;

      if (name) {
        const drinksRes: DrinkBasic[] = await (
          await api.get('/api/get/drinks-by-name?name=' + name)
        ).data;
        dispatch(setDrinks(drinksRes));
      }
    };

    dispatch(clearDrinks());
    searchForDrink();
  }, [dispatch, router.query]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="row">
          <SideMenu />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Search;
