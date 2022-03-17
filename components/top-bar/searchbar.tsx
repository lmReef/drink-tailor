import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledSearchbar = styled.input`
  width: 30rem;

  margin: 0.8rem 0 0.8rem 1rem;
  padding: 1rem;

  background-color: ${colors.secondary};
  border-radius: 110px;
  border: none;

  :focus {
    outline: none;
  }
`;

const Searchbar = () => {
  return <StyledSearchbar />;
};

export default Searchbar;
