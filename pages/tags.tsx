import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TagMenu from '../components/tag-menu/tag-menu';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';

const Index = () => {
  const dispatch = useDispatch();
  const [sideMenuHidden, setSideMenuHidden] = useState<boolean>(false);

  const handleSideMenuClose = () => {
    setSideMenuHidden(true);
  };

  useEffect(() => {
    // set redux state
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (theme) dispatch(changeTheme(theme));
      if (favourites) dispatch(setFavouriteDrinks(favourites));
    }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <SideMenu />
        <div className="row">
          <TagMenu hidden={sideMenuHidden} handler={handleSideMenuClose} />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Index;
