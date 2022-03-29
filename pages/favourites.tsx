import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { setDrinks } from '../components/content/drinksSlice';
import { clearTags } from '../components/common/tags/tagSlice';

const Index = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // set redux state
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (theme) dispatch(changeTheme(theme));
      if (favourites) dispatch(setFavouriteDrinks(favourites));
    }

    dispatch(clearTags());

    const favouriteDrinks = JSON.parse(localStorage.getItem('favourites'));
    dispatch(setDrinks(favouriteDrinks));
  }, [dispatch]);

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
