import styled from 'styled-components';
import { colors } from '../../styles/theme';

const StyledSearchbar = styled.input`
  width: 30rem;

  margin: 0.8rem auto 0.8rem auto;
  padding: 1rem;
  font-size: 1.2rem;

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
