import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';
import { setFavouriteDrinks } from '../components/favouritesSlice';
import { changeTheme, checkDevice, selectIsMobile } from '../styles/themeSlice';
import SideMenu from '../components/side-menu/side-menu';
import { clearTags } from '../components/common/tags/tagSlice';
import { setDrinks } from '../components/content/drinksSlice';
import api from '../components/common/axios-setup';
import styled from 'styled-components';
import { breakpoints_max, colors } from '../styles/theme';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

const ListType = styled.div`
  h2 {
    margin: 2rem;
    text-align: center;
    letter-spacing: 1px;

    @media only screen and (max-width: ${breakpoints_max.sm}) {
      font-size: 1.3rem;
      margin: 2rem auto;
    }

    span {
      margin: 0 1rem;
      cursor: pointer;

      &.active {
        color: ${colors.accent};
      }

      svg {
        font-size: 1.15rem;
      }
    }
  }
`;

declare type ListType = 'popular' | 'latest' | 'random';

const Index = () => {
  const dispatch = useDispatch();
  const [listType, setListType] = useState<ListType>('popular');
  const isMobile = useSelector(selectIsMobile);

  const getDrinks = async () => {
    if (listType === 'popular') {
      dispatch(
        setDrinks(await (await api.get('/api/get/popular-drinks')).data),
      );
    } else if (listType === 'latest') {
      dispatch(setDrinks(await (await api.get('/api/get/latest-drinks')).data));
    } else if (listType === 'random') {
      dispatch(setDrinks(await (await api.get('/api/get/random-drinks')).data));
    }
  };

  useEffect(() => {
    // set redux state
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('theme');
      const favourites = JSON.parse(localStorage.getItem('favourites'));

      if (theme) dispatch(changeTheme(theme));
      if (favourites) dispatch(setFavouriteDrinks(favourites));
      dispatch(checkDevice());
    }

    dispatch(clearTags());
  }, [dispatch]);

  useEffect(() => {
    getDrinks();
    document.getElementById('content').scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, listType]);

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <div className="row">
          {!isMobile && <SideMenu />}
          <ListType className="col">
            <h2>
              <span
                className={listType === 'popular' ? 'active' : undefined}
                onClick={() => setListType('popular')}
              >
                Popular
              </span>
              |
              <span
                className={listType === 'latest' ? 'active' : undefined}
                onClick={() => setListType('latest')}
              >
                Latest
              </span>
              |
              <span
                className={listType === 'random' ? 'active' : undefined}
                onClick={() => {
                  if (listType === 'random') {
                    getDrinks();
                  } else setListType('random');
                }}
              >
                Random <FontAwesomeIcon icon={faRedo} />
              </span>
            </h2>
            <Content />
          </ListType>
        </div>
        {isMobile && <SideMenu />}
      </div>
    </>
  );
};

export default Index;
