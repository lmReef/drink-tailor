/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Image from 'next/image';
import {
  breakpoints_min,
  breakpoints_max,
  colors_light,
  colors_dark,
} from '../styles/theme';
import SideMenu from '../components/side-menu/side-menu';

const Wrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: row;

  color: ${(props) => props.theme[1]};
`;

const Content = styled.div`
  height: 100%;
  width: 70%;
  overflow-y: scroll;

  text-align: center;
  background-color: ${(props) => [props.theme[2]]};
  /* background-color: ${(props) => props.theme[0]}; */

  .no-drinks {
    position: relative;
    width: 50%;
    margin: auto;
    top: 35%;
    font-size: 3rem;
  }

  .drink-card {
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
  }
`;

const getDrinks = async (tags) => {
  const options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
    params: { i: `${tags.reduce((a, b) => `${a},${b}`)}` },
    headers: {
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': 'cd095dd235mshadd3945f9bfaac1p1347b1jsnb88073d8b4f0',
    },
  };

  const { data } = await axios.request(options);

  return data.drinks;
};

const getDetails = async (id) => {
  var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
    params: { i: id },
    headers: {
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
      'x-rapidapi-key': 'cd095dd235mshadd3945f9bfaac1p1347b1jsnb88073d8b4f0',
    },
  };

  const { data } = await axios.request(options);

  return data.drinks[0];
};

const Index = () => {
  // const theme = colors_light;
  const theme = colors_dark;
  const [timeoutId, setTimeoutId] = useState(null);
  const [data, setData] = useState(null);
  const [hasTags, setHasTags] = useState(false);

  const handleTagChange = async (tags) => {
    if (tags.length === 0) {
      setData(null);
      setHasTags(false);
      return;
    }

    setData(await getDrinks(tags));
    setHasTags(true);

    // TODO: implement delay
    // if (timeoutId) clearTimeout(timeoutId);

    // setTimeoutId(
    //   setTimeout(() => {
    //     setData(fetchCocktails(tags));
    //     console.log(data);
    //     setTimeoutId(null);
    //   }, 1000),
    // );
  };

  return (
    <Wrapper theme={theme}>
      <SideMenu theme={theme} handleTagChange={handleTagChange} />
      <Content theme={theme} className="main-wrapper">
        {typeof data !== 'string' && data?.length > 0 ? (
          data?.map((drink, index) => {
            return (
              <div key={index} className="drink-card">
                <img
                  src={drink.strDrinkThumb}
                  alt={`Image of a ${drink.strDrink}`}
                  className="card-image"
                />
                <div className="col">
                  <h3>{drink.strDrink}</h3>
                  {/* <button className="view-details">View Details</button> */}
                </div>
              </div>
            );
          })
        ) : hasTags === false ? (
          <h2 className="no-drinks">
            Pick a few options on the left to get started.
          </h2>
        ) : (
          <h2 className="no-drinks">
            We dont know any drinks with that combination! Try something else.
          </h2>
        )}
      </Content>
    </Wrapper>
  );
};

export default Index;
