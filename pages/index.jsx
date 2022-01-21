import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
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
`;

const Content = styled.div`
  height: 100%;
  width: 70%;
  overflow-y: scroll;

  text-align: center;
  background-color: white;
  /* background-color: ${(props) => props.theme[0]}; */
`;

const fetchCocktails = async (tags) => {
  // let query = '';
  // for (let i in tags) {
  //   query += tags[i] += '%2C';
  // }

  // const res = await fetch(
  //   `https://the-cocktail-db.p.rapidapi.com/filter.php?i=Gin`,
  //   {
  //     method: 'GET',
  //     headers: {
  //       'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com',
  //       'x-rapidapi-key': 'cd095dd235mshadd3945f9bfaac1p1347b1jsnb88073d8b4f0',
  //     },
  //   },
  // );

  // return await res.json();

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

const Index = () => {
  const theme = colors_light;
  const [timeoutId, setTimeoutId] = useState(null);
  const [data, setData] = useState(null);

  const handleTagChange = async (tags) => {
    console.log('tags', tags);
    if (tags.length === 0) {
      console.log('0');
      setData(null);
      return;
    }

    setData(await fetchCocktails(tags));
    console.log('tags', tags);

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

  console.log('data', data);

  return (
    <Wrapper>
      <SideMenu theme={theme} handleTagChange={handleTagChange} />
      <Content theme={theme} className="main-wrapper">
        {typeof data !== 'string' && data?.length > 0
          ? data?.map((drink, index) => {
              return <p key={index}>{drink.strDrink}</p>;
            })
          : ''}
      </Content>
    </Wrapper>
  );
};

export default Index;
