import styled from 'styled-components';

import { colors } from '../../styles/theme';
import Searchbar from './searchbar';
import ThemeButton from './theme-button';

const StyledNavbar = styled.div`
  height: 4rem;
  width: 100%;

  display: flex;
  flex-direction: row;

  background-color: ${colors.background2};
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <Searchbar />
      <ThemeButton />
    </StyledNavbar>
  );
};

export default Navbar;
