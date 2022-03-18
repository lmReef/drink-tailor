// TODO: look into this error:
/* eslint-disable @next/next/no-img-element */
import styled from 'styled-components';
import ReactVisibilitySensor from 'react-visibility-sensor';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Ingredient {
  ingredient: string;
  measurement: string;
}

const StyledDrinkCard = styled.div`
  margin: 1rem;
  display: flex;
  text-align: left;

  img {
    width: 300px;
    height: 300px;
    margin-right: 1rem;
    border-radius: 10px;
  }

  h3 {
    font-size: 1.3rem;
  }

  .card-content {
    h4 {
      margin-top: 1rem;
    }
    p {
    }
  }
`;

const DrinkCard = ({ drink }: { drink: DrinkBasic }) => {
  const [sensorActive, setSensorActive] = useState<boolean>(true);
  const [drinkDetails, setDrinkDetails] = useState<DrinkDetails>(null);

  // only make api requests if component is visible so I dont spam it
  const onChange = async (isVisible) => {
    if (isVisible) {
      const data = await fetch(
        '/api/get/drink-details-by-id?id=' + drink.idDrink,
      ).then((res) => res.json());

      setDrinkDetails(data);

      // disable sensor because we dont need to redo all this
      setSensorActive(false);
    }
  };

  const getIngredients = () => {
    let ingredients: Ingredient[] = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drinkDetails['strIngredient' + i];
      const measurement = drinkDetails['strMeasure' + i];
      if (ingredient)
        ingredients.push({
          ingredient,
          measurement,
        });
    }

    return ingredients;
  };

  return (
    <ReactVisibilitySensor
      onChange={(isVisible) => onChange(isVisible)}
      partialVisibility={true}
      offset={{ bottom: -1000 }}
      active={sensorActive}
    >
      <StyledDrinkCard>
        <img
          src={drink.strDrinkThumb}
          alt={`Image of a ${drink.strDrink}`}
          className="card-image"
        />
        <div className="col">
          <span>
            <h3>{drink.strDrink}</h3>
            {/* <FontAwesomeIcon icon={} /> */}
          </span>
          <div className="card-content">
            {drinkDetails && (
              <>
                <h4>Ingredients:</h4>
                <p>
                  {getIngredients().map((item, index) => {
                    return `${item.measurement || ''} ${
                      item.ingredient || ''
                    }, `;
                  })}
                </p>
                <h4>Instructions:</h4>
                <p> {drinkDetails.strInstructions}</p>
                {/* <h4>Alcoholic?</h4>
                <p>
                  {drinkDetails.strAlcoholic === 'Alcoholic' ? 'Yes' : 'No'}
                </p> */}
              </>
            )}
          </div>
          {/* <button className="view-details">View Details</button> */}
        </div>
      </StyledDrinkCard>
    </ReactVisibilitySensor>
  );
};

export default DrinkCard;
