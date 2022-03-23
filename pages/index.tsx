import styled from 'styled-components';

import SideMenu from '../components/side-menu/side-menu';
import { colors } from '../styles/theme';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { changeTheme } from '../styles/themeSlice';
import { useDispatch } from 'react-redux';
import { setFavouriteDrinks } from '../components/favouritesSlice';

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

  // set redux state
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    const favourites = JSON.parse(localStorage.getItem('favourites'));

    if (theme) dispatch(changeTheme(theme));
    if (favourites) dispatch(setFavouriteDrinks(favourites));
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="row">
          <SideMenu />
          <Content />
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
