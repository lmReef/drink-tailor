import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { setDrinks } from '../components/content/drinksSlice';
import { clearTags } from '../components/common/tags/tagSlice';
import { useRouter } from 'next/router';
import api from '../components/common/axios-setup';

const Index = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const searchForDrink = async () => {
    const name = router.query.name;

    if (name) {
      const drinksRes: DrinkBasic[] = await (
        await api.get('/api/get/drinks-by-name?name=' + name)
      ).data;
      dispatch(setDrinks(drinksRes));
    }
  };

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
    searchForDrink();
  }, [router.query]);

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

export default Index;
