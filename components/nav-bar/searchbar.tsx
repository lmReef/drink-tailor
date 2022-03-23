import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { breakpoints_max, colors } from '../../styles/theme';

const StyledSearchbar = styled.div`
  position: relative;
  display: flex;

  width: 30rem;
  margin: auto auto;

  input {
    position: relative;
    width: 100%;
    padding: 0.5rem 1rem;

    font-size: 1.2rem;
    background-color: ${colors.secondary};
    border-radius: 110px;
    border: none;

    :focus {
      outline: none;
    }
  }

  svg {
    /* TODO: this is kinda gross, should probably reimplement */
    position: absolute;
    height: 1.5rem;
    top: 50%;
    right: 0;
    translate: -1rem -0.75rem;
    color: ${colors.text2};
    cursor: pointer;
  }

  @media only screen and (max-width: ${breakpoints_max.lg}) {
    display: none;
  }
`;

const Searchbar = () => {
  return (
    <StyledSearchbar>
      <input type="text" placeholder="Search for a drink or ingredient..." />
      <FontAwesomeIcon icon={faSearch} />
    </StyledSearchbar>
  );
};

export default Searchbar;
