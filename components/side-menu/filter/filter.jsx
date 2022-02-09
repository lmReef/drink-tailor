import { useState } from 'react';
import styled from 'styled-components';
import Tags from './tags';

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme[1]};

  /* transform: scaleY(1); */
  transition: all 0.2s;
  transform-origin: top;

  h2 {
    margin: 0.8rem;
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 1px;
    font-size: 1.5rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 1rem;
  }
`;

const Arrow = styled.div`
  margin: 0 auto 0 auto;
  width: fit-content;
  cursor: pointer;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;

  transition: all 0.2s ease-out;

  &:hover {
    color: ${(props) => props.theme[2]};
  }

  svg {
    height: 1rem;
    width: auto !important;
  }
`;

const Filter = ({ activeTags, handleTagClick, theme }) => {
  // TODO: add all the filters
  const mixers = [
    'Soda Water',
    'Tonic Water',
    'Cranberry Juice',
    'Orange Juice',
    'Ginger Ale',
    'Lemonade',
  ];
  const liquors = [
    'Gin',
    'Vodka',
    'Rum',
    'Dark Rum',
    'Light Rum',
    'Scotch',
    'Tequila',
    'Bourbon',
    'Brandy',
    'Cognac',
    'Whiskey',
    'Champagne',
    'Prosecco',
    'Red Wine',
    '151 Proof Rum',
  ];
  const liqueurs = [
    'Triple Sec',
    'Blue Curacao',
    'Malibu Rum',
    'Aperol',
    'Sambuca',
    'Campari',
    'Dry Vermouth',
    'Sweet Vermouth',
    'Galliano',
    'Green Chartreuse',
    'Absinthe',
    'Jagermeister',
    'Kahlua',
  ];
  const others = [
    'Bitters',
    'Grenadine',
    'Cream',
    'Lemon Juice',
    'Lemon',
    'Orange',
    'Lime',
    'Lime Juice',
    'Egg White',
    'Egg',
    'Honey',
    'Maraschino Cherry',
    'Mint',
    'Pineapple',
    'Sugar',
    'Elderflower cordial',
  ];

  // TODO: add custom ingredient search input
  // TODO: make sections collapsable on mobile

  return (
    <StyledDiv>
      <h2>Spirits</h2>
      <Tags
        theme={theme}
        tags={liquors}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
      <h2>Liqueurs</h2>
      <Tags
        theme={theme}
        tags={liqueurs}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
      <h2>Mixers</h2>
      <Tags
        theme={theme}
        tags={mixers}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
      <h2>Extras</h2>
      <Tags
        theme={theme}
        tags={others}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
    </StyledDiv>
  );
};

export default Filter;
