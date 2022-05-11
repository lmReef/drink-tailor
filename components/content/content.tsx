import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

import { breakpoints_max, breakpoints_min, colors } from '../../styles/theme';
import { selectAllTags } from '../common/tags/tagSlice';
import DrinkCard from './drink-card/drink-card';
import api from '../common/axios-setup';
import TopMenu from '../top-menu/top-menu';
import { clearDrinks, selectAllDrinks, setDrinks } from './drinksSlice';
import { useRouter } from 'next/router';
import AdsenseAd from '../common/adsense-ad';

const StyledContent = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  text-align: center;
  background-color: ${colors.background1};
  top: 3.5rem;

  .drink-card-wrapper {
    &.add-margin {
      @media only screen and (min-width: ${breakpoints_min.sm}) {
        margin: 0 10rem;
      }
    }
  }

  .no-drinks {
    position: relative;
    width: 50%;
    height: fit-content;
    margin: auto;
    top: 50%;
    transform: translateY(calc(-50% - 3rem));
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

    @media only screen and (max-width: ${breakpoints_max.sm}) {
      margin: 5rem 1rem;
    }
  }

  ins {
    display: block;
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    // expand content a bit on mobile to account for nav
    height: calc(100% - 4rem);
  }
`;

const Content = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const activeTags = useSelector(selectAllTags);
  const drinks = useSelector(selectAllDrinks);
  const contentRef = useRef<HTMLDivElement>();
  const [loading, setLoading] = useState<boolean>(false);
  const hasTags = activeTags.length > 0;

  const scrollToTop = () => contentRef.current.scrollTo(0, 0);

  const insertAdsInContent = (index) => {
    const adInterval = 4;

    if ((index + 1) % adInterval === 0 && index > 0) {
      return <AdsenseAd />;
    } else if (index === drinks.length && drinks.length < adInterval) {
      return <AdsenseAd />;
    }
  };

  // TODO: implement this for better content overflow handling on mobile
  // function isOverflown(element) {
  //   return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
  // }

  // handler for when the tags are changed via any method
  useEffect(() => {
    // only handle changing tags if we on the tags page
    if (router.pathname === '/tags') {
      const handleTagsChange = async () => {
        if (activeTags.length === 0) {
          dispatch(clearDrinks());
          return;
        }

        setLoading(true);

        const drinksRes: DrinkBasic[] = await (
          await api.get('/api/get/drinks-by-tags?tags=' + activeTags)
        ).data;

        dispatch(setDrinks(drinksRes));
        scrollToTop();
        setLoading(false);
      };
      handleTagsChange();
    }
  }, [activeTags, dispatch, router.pathname]);

  return (
    <StyledContent ref={contentRef} id="content">
      {drinks?.length > 0 ? (
        <>
          {hasTags && <TopMenu />}
          <div
            className={`drink-card-wrapper ${
              router.pathname !== '/tags' && 'add-margin'
            }`}
          >
            {drinks?.map((drink, index) => {
              return (
                <>
                  <DrinkCard key={index} drink={drink} api={api} />
                  <br />
                  {insertAdsInContent(index)}
                </>
              );
            })}
          </div>
        </>
      ) : router.pathname === '/favourites' ? (
        <h2 className="no-drinks">
          It looks like you dont have any favourites yet. Add a few to see them
          here.
        </h2>
      ) : router.pathname === '/tags' && !hasTags ? (
        <h2 className="no-drinks">
          Pick a few options on the left to get started.
        </h2>
      ) : router.pathname === '/tags' && hasTags && !loading ? (
        <h2 className="no-drinks">
          We dont know any drinks with that combination! Give something else a
          try.
        </h2>
      ) : router.pathname.includes('/search') ? (
        <h2 className="no-drinks">
          We dont know any drinks by that name! Give something else a try.
        </h2>
      ) : (
        <></>
      )}
      {(hasTags || router.pathname !== '/tags') && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FontAwesomeIcon icon={faChevronCircleUp} />
        </div>
      )}
    </StyledContent>
  );
};

export default Content;
