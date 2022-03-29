import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { colors } from '../styles/theme';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';

const Index = () => {
  const dispatch = useDispatch();
  const [sideMenuHidden, setSideMenuHidden] = useState<boolean>(false);

  // set redux state
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    const favourites = JSON.parse(localStorage.getItem('favourites'));

    if (theme) dispatch(changeTheme(theme));
    if (favourites) dispatch(setFavouriteDrinks(favourites));
  }

  const handleSideMenuClose = () => {
    setSideMenuHidden(true);
  };

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="row">
          {/* <TagMenu hidden={sideMenuHidden} handler={handleSideMenuClose} /> */}
          <SideMenu />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Index;
