import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import SideMenu from '../components/side-menu/side-menu';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { colors } from '../styles/theme';
import { changeTheme } from '../styles/themeSlice';

const Wrapper = styled.div`
  /* height = 100vh - height of navbar */
  height: calc(100vh - 4rem);

  display: flex;

  color: ${colors.text1};
  background-color: ${colors.background1};

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .col {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

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
      <Wrapper>
        <div className="row">
          <SideMenu hidden={sideMenuHidden} handler={handleSideMenuClose} />

          <Content />
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
