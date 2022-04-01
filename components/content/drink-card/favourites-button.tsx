import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { addDrink, removeDrink, selectFavourite } from '../../favouritesSlice';

const StyledFavButton = styled.div`
  color: ${colors.text1};
  font-size: 1.3rem;
  cursor: pointer;
  margin-left: auto;

  svg {
    color: ${colors.secondary};
    margin-left: 0.5rem;
  }

  &.favourites-active {
    svg {
      color: ${colors.accent};
    }
  }
`;

const FavouritesButton = ({ drink }) => {
  const dispatch = useDispatch();
  const active = useSelector((state) => selectFavourite(state, drink));

  const onClick = () => {
    if (!active) {
      dispatch(addDrink(drink));
    } else {
      dispatch(removeDrink(drink));
    }
  };

  return (
    <StyledFavButton
      className={`favourites-star ${active ? 'favourites-active' : undefined}`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faStar} />
    </StyledFavButton>
  );
};

export default FavouritesButton;
