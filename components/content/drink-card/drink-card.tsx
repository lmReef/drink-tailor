// TODO: look into this error:
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ReactVisibilitySensor from 'react-visibility-sensor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes, faSpinner } from '@fortawesome/free-solid-svg-icons';

import Tag from '../../common/tags/tag';
import { Axios } from 'axios';
import FavouritesButton from './favourites-button';
import { breakpoints_max, colors } from '../../../styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { selectUnit } from '../drinksSlice';
import { convertUnits } from '../../helpers';

interface Ingredient {
  ingredient: string;
  measurement: string;
}

const StyledDrinkCard = styled.div`
  height: fit-content;
  min-height: 18rem;
  margin: 1rem;
  display: flex;
  text-align: left;

  .card-image {
    height: 18rem;
    width: auto;
    min-height: 18rem;
    min-width: 18rem;
    margin-right: 1rem;
    border-radius: 10px;
  }

  .loading {
    width: 100%;
    height: 18rem;

    svg {
      font-size: 3rem;
      position: relative;

      top: calc(50% - 1.5rem);
      left: calc(50% - 1.5rem);

      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }

  .col {
    width: 100%;

    h3 {
      font-size: 1.35rem;
    }

    .card-content {
      font-size: 1.15rem;

      h4 {
        margin-top: 1rem;
      }

      .ingredient-div {
        max-height: 7rem;
        width: fit-content;
        max-width: 100%;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        @media only screen and (max-width: ${breakpoints_max.sm}) {
          max-height: unset;
        }

        .ingredient-item {
          margin-right: 2rem;
          margin-top: 0.5rem;

          .tag {
            display: inline;
            margin: auto;
            padding: 0.2rem 0.5rem;
            height: fit-content;
            border-radius: 9001px;
            font-size: 1rem;
          }
        }
      }
    }
  }

  /* share and fav buttons */
  div.drink-card-button {
    color: ${colors.text1};
    font-size: 1.3rem;
    margin-left: 1rem;
    cursor: pointer;

    svg {
      transition: color 0.15s ease-out;
      color: ${colors.secondary};
      padding: 0.25rem;
    }

    &.favourites-active {
      svg {
        color: ${colors.accent};
      }
    }

    &:first-of-type {
      margin-left: auto;
    }

    &.share-button {
      svg {
        transition: color 0.9s ease-out;
      }

      :active {
        .share-tooltip {
          transition: all 0s;
          visibility: visible;
          color: ${colors.text1};
        }

        svg {
          transition: color 0s;
          color: ${colors.accent};
        }
      }
    }
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    flex-direction: column;

    .card-image {
      width: 100%;
      height: auto;
      margin: 0 0 1rem 0;
    }
  }
`;

const DrinkCard = ({ drink, api }: { drink: DrinkBasic; api: Axios }) => {
  const unit = useSelector(selectUnit);
  const [sensorActive, setSensorActive] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);
  const [drinkDetails, setDrinkDetails] = useState<DrinkDetails>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // TODO: improve sharing

  // only make api requests if component is visible so I dont spam it
  const onChange = async (isVisible) => {
    if (isVisible) {
      setVisible(true);
    } else setVisible(false);
  };

  const getIngredients = (data) => {
    let ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = data['strIngredient' + i];
      const measurement = data['strMeasure' + i];
      if (ingredient)
        ingredients.push({
          ingredient,
          measurement,
        });
    }

    return ingredients;
  };

  const handleShare = () => {
    // TODO: fix '&' in searchbar not working
    const shareUrl = encodeURI(
      `http://drinktailor.net/search?name=${drinkDetails.strDrink}`,
    );
    navigator.clipboard.writeText(shareUrl);
  };

  useEffect(() => {
    setSensorActive(true);
  }, [drink]);

  useEffect(() => {
    const getDrinkDetails = async () => {
      setLoading(true);

      const data: DrinkDetails = await (
        await api.get('/api/get/drink-details-by-id?id=' + drink.idDrink)
      ).data;

      for (let i = 1; i <= 15; i++) {
        if (data[`strMeasure${i}`])
          data[`strMeasure${i}`] = convertUnits(data[`strMeasure${i}`], unit);
      }

      setDrinkDetails(data);
      setIngredients(getIngredients(data));
      setLoading(false);
    };

    if (visible && sensorActive) {
      getDrinkDetails();
      setSensorActive(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drink, visible, sensorActive]);

  return (
    <ReactVisibilitySensor
      onChange={(isVisible) => onChange(isVisible)}
      partialVisibility={true}
      offset={{ bottom: -1000 }}
      active={sensorActive}
    >
      <StyledDrinkCard>
        {loading ? (
          <div className="loading">
            <FontAwesomeIcon icon={faSpinner} />
          </div>
        ) : (
          <>
            <img
              src={drink.strDrinkThumb}
              alt={`Image of a ${drink.strDrink}`}
              className="card-image"
            />
            <div className="col">
              <span>
                <div className="row">
                  <h3>{drink.strDrink}</h3>
                  <div
                    className="drink-card-button share-button"
                    onClick={handleShare}
                  >
                    {/* <div className="share-tooltip">Copied to Clipboard!</div> */}
                    <FontAwesomeIcon icon={faShareNodes} />
                  </div>
                  <FavouritesButton drink={drink} />
                </div>
                {drinkDetails?.strAlcoholic !== 'Alcoholic' && (
                  <h4>Non Alcoholic</h4>
                )}
              </span>
              <div className="card-content">
                {drinkDetails && (
                  <>
                    <h4>Ingredients:</h4>
                    <div className="ingredient-div">
                      {ingredients.map((item, index) => {
                        return (
                          <div className="ingredient-item" key={index}>
                            {`${item.measurement || ''} `}
                            <Tag name={item.ingredient} />
                            {', '}
                          </div>
                        );
                      })}
                    </div>
                    <h4>Instructions:</h4>
                    <p> {drinkDetails.strInstructions}</p>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </StyledDrinkCard>
    </ReactVisibilitySensor>
  );
};

export default DrinkCard;
