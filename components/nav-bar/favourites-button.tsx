import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../../styles/theme';
import { clearTags } from '../common/tags/tagSlice';
import {
  toggleFavouritesActive,
  selectFavouritesActive,
} from '../favouritesSlice';

const StyledFavButton = styled.div`
  height: 100%;
  padding: 1.3rem;
  color: ${colors.text1};
  font-size: 1.1rem;
  cursor: pointer;

  svg {
    color: ${colors.secondary};
    height: 100%;
    margin-left: 0.5rem;
  }

  &.favourites-active {
    color: ${colors.primary};
    svg {
      color: ${colors.accent};
    }
  }
`;

const FavouritesButton = () => {
  const dispatch = useDispatch();
  const favouritesActive = useSelector(selectFavouritesActive);

  const onClick = () => {
    // dispatch(clearTags());
    dispatch(toggleFavouritesActive());
  };

  return (
    <StyledFavButton
      className={`favourites-star ${favouritesActive && 'favourites-active'}`}
      onClick={onClick}
    >
      Favourites
      <FontAwesomeIcon icon={faStar} />
    </StyledFavButton>
  );
};

export default FavouritesButton;
