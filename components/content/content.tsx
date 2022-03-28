import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../styles/theme';
import { selectAllTags } from '../common/tags/tagSlice';
import DrinkCard from './drink-card/drink-card';
import api from '../common/axios-setup';
import TopMenu from '../top-menu/top-menu';
import {
  selectFavouritesActive,
  selectHasFavourites,
} from '../favouritesSlice';
import { clearDrinks, selectAllDrinks, setDrinks } from './drinksSlice';

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  text-align: center;
  background-color: ${colors.background1};
  top: 3.5rem;

  .no-drinks {
    position: relative;
    width: 50%;
    height: 8rem;
    margin: auto;
    top: calc(50% - 8rem);
    font-size: 3rem;
  }

  .scroll-to-top {
    position: absolute;
    bottom: 0;
    right: 0;
    margin: 2.5rem 4rem;
    cursor: pointer;

    transition: transform 0.1s ease-in-out;

    :hover {
      transform: translateY(-0.3rem);
    }

    svg {
      color: ${colors.accent};
      font-size: 2.3rem;
    }
  }
`;

const Content = () => {
  const dispatch = useDispatch();
  const activeTags = useSelector(selectAllTags);
  const favouritesActive = useSelector(selectFavouritesActive);
  const hasFavourites = useSelector(selectHasFavourites);
  const drinks = useSelector(selectAllDrinks);
  const contentRef = useRef<HTMLDivElement>();
  const hasTags = activeTags.length > 0;

  const scrollToTop = () => contentRef.current.scrollTo(0, 0);

  useEffect(() => {
    if (!favouritesActive) {
      const handleTagsChange = async () => {
        if (activeTags.length === 0) {
          dispatch(clearDrinks());
          return;
        }

        const drinksRes: DrinkBasic[] = await (
          await api.get('/api/get/drinks-by-tags?tags=' + activeTags)
        ).data;

        dispatch(setDrinks(drinksRes));
        scrollToTop();
      };

      handleTagsChange();
    }
  }, [activeTags, favouritesActive, dispatch]);

  useEffect(() => {
    if (favouritesActive) {
      const favouriteDrinks = JSON.parse(localStorage.getItem('favourites'));
      dispatch(setDrinks(favouriteDrinks));
    }
  }, [favouritesActive, dispatch]);

  return (
    <StyledContent ref={contentRef} id="content">
      {drinks?.length > 0 && typeof drinks !== 'string' ? (
        <>
          {hasTags && <TopMenu />}
          {drinks?.map((drink, index) => {
            return <DrinkCard key={index} drink={drink} api={api} />;
          })}
        </>
      ) : !hasTags && !favouritesActive ? (
        <h2 className="no-drinks">
          Pick a few options on the left to get started.
        </h2>
      ) : !hasFavourites && favouritesActive ? (
        <h2 className="no-drinks">
          It looks like you dont have any favourites yet. Add a few to see them
          here.
        </h2>
      ) : hasTags ? (
        <h2 className="no-drinks">
          We dont know any drinks with that combination! Give something else a
          try.
        </h2>
      ) : (
        <></>
      )}
      {hasTags && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronCircleUp} />
        </div>
      )}
    </StyledContent>
  );
};

export default Content;
