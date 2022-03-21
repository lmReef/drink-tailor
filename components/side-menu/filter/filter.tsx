import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import Tags from './tags';

const StyledDiv = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;

  background-color: ${colors.background2};

  transition: all 0.2s;
  transform-origin: top;

  h2 {
    margin: 0.8rem;
    text-align: center;
    font-size: 1.3rem;
    letter-spacing: 1px;
    font-size: 1.7rem;
    color: ${colors.accent};
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
    color: ${colors.secondary};
  }

  svg {
    height: 1rem;
    width: auto !important;
  }
`;

const Filter = () => {
  // TODO: add all the filters
  const mixers = [
    'Soda Water',
    'Tonic Water',
    'Cranberry Juice',
    'Orange Juice',
    'Ginger Ale',
    'Lemonade',
  ];
  // TODO: maybe move wines to own section?
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

  // TODO: add custom ingredient search input?
  // TODO: make sections collapsable on mobile

  return (
    <StyledDiv>
      <h2>Spirits</h2>
      <Tags tags={liquors} />
      <h2>Liqueurs</h2>
      <Tags tags={liqueurs} />
      <h2>Mixers</h2>
      <Tags tags={mixers} />
      <h2>Extras</h2>
      <Tags tags={others} />
    </StyledDiv>
  );
};

export default Filter;
