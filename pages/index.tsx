/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import axios, { AxiosRequestConfig } from 'axios';
import Image from 'next/image';

import SideMenu from '../components/side-menu/side-menu';
import { colors } from '../styles/theme';
import Navbar from '../components/top-bar/navbar';

const Wrapper = styled.div`
  /* height = 100vh - height of navbar */
  height: calc(100vh - 4rem);

  display: flex;

  color: ${colors.text1};
  background-color: ${colors.background1};

  .row {
    /* width: 100%; */
    display: flex;
  }
`;

const Content = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;

  text-align: center;
  background-color: ${colors.background1};

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
  const options: AxiosRequestConfig = {
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
  var options: AxiosRequestConfig = {
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
  const dispatch = useDispatch();
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
    <>
      <Navbar />
      <Wrapper>
        <div className="row">
          <SideMenu handleTagChange={handleTagChange} />
          <Content>
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
                We dont know any drinks with that combination! Try something
                else.
              </h2>
            )}
          </Content>
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
