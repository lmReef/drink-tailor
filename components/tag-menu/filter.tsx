import styled from 'styled-components';
import { colors } from '../../styles/theme';
import Tags from '../common/tags/tags';
import tagsList from './tags-list';

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

  // TODO: maybe move wines to own section?

  // TODO: add custom ingredient search input?
  // TODO: make sections collapsable on mobile

  return (
    <StyledDiv>
      {Object.keys(tagsList).map((key, index) => {
        return (
          <>
            <h2>{key}</h2>
            <Tags tags={tagsList[key]} />
          </>
        );
      })}
      {/* TODO: make a button to clear em all */}
    </StyledDiv>
  );
};

export default Filter;
