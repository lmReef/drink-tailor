import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TagMenu from '../components/tag-menu/tag-menu';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { breakpoints_max, colors } from '../styles/theme';

const StyledMenuButton = styled.div`
  display: none;
  position: absolute;
  left: 0;
  top: 4rem;
  padding: 1rem;
  margin-left: 0.7rem;
  font-size: 1.5rem;
  z-index: 1;

  border-radius: 0 0 8px 8px;
  background-color: ${colors.background1};
  cursor: pointer;

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    display: unset;
  }
`;

const Tags = () => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState<boolean>(false);

  const handler = () => setHidden(!hidden);

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
        <StyledMenuButton onClick={handler}>
          <FontAwesomeIcon icon={faBars} />
        </StyledMenuButton>
        <SideMenu />
        <div className="row">
          <TagMenu hidden={hidden} handler={handler} />
          <Content />
        </div>
      </div>
    </>
  );
};

export default Tags;
