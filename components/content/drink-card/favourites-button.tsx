import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { addDrink, removeDrink, selectFavourite } from '../../favouritesSlice';

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
    <div
      className={`drink-card-button favourites-star ${
        active ? 'favourites-active' : undefined
      }`}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faStar} />
    </div>
  );
};

export default FavouritesButton;
