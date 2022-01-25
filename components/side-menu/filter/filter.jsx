import { useState } from 'react';
import styled from 'styled-components';
import Tags from './tag';

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
  const liquors = ['Gin', 'Vodka', 'Rum', 'Scotch', 'Tequila'];
  const types = [''];

  return (
    <StyledDiv>
      <h2>Type</h2>
      <Tags
        theme={theme}
        tags={types}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
      <h2>Liquors</h2>
      <Tags
        theme={theme}
        tags={liquors}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />
    </StyledDiv>
  );
};

export default Filter;
