/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';
import axios, { AxiosRequestConfig } from 'axios';
import Image from 'next/image';

import SideMenu from '../components/side-menu/side-menu';
import { colors } from '../styles/theme';
import Navbar from '../components/top-bar/navbar';
import Content from '../components/content/content';

const Wrapper = styled.div`
  /* height = 100vh - height of navbar */
  height: calc(100vh - 4rem);

  display: flex;

  color: ${colors.text1};
  background-color: ${colors.background1};

  .row {
    /* width: 100%; */
    display: flex;
    flex-direction: row;
  }
  .col {
    /* width: 100%; */
    display: flex;
    flex-direction: column;
  }
`;

const Index = () => {
  const [drinks, setDrinks] = useState<DrinkBasic[]>(null);
  const [hasTags, setHasTags] = useState<boolean>(false);

  // handler gets passed down to tags; updates state here when triggered
  const handleTagChange = async (tags) => {
    if (tags.length === 0) {
      setDrinks(null);
      setHasTags(false);
      return;
    }

    const drinksRes: DrinkBasic[] = await (
      await axios.get('/api/get/drinks-by-tags?tags=' + tags)
    ).data;

    setDrinks(drinksRes);
    setHasTags(true);
  };

  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="row">
          <SideMenu handleTagChange={handleTagChange} />
          <Content drinks={drinks} hasTags={hasTags} />
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
