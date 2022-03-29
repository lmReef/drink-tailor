import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons';

import { breakpoints_max, colors } from '../../styles/theme';
import Searchbar from './searchbar';
import ThemeButton from './theme-button';

const StyledNavbar = styled.div`
  height: 4rem;
  width: 100%;

  display: flex;
  flex-direction: row;
  margin: auto;

  background-color: ${colors.background2};

  .nav-header {
    position: relative;
    display: flex;
    height: 100%;
    margin: auto 1rem auto 1rem;

    cursor: pointer;

    svg.header-icon {
      height: 2rem;
      margin: 1rem;
      color: ${colors.accent};
    }

    h1 {
      color: ${colors.text1};
      margin: auto 0;
      letter-spacing: 1px;
    }
  }
`;

const Navbar = () => {
  return (
    <StyledNavbar>
      <div className="nav-header" onClick={() => (window.location.href = '/')}>
        <FontAwesomeIcon icon={faMartiniGlassCitrus} className="header-icon" />
        <h1>Drink Tailor</h1>
      </div>
      <Searchbar />
      <ThemeButton />
    </StyledNavbar>
  );
};

export default Navbar;
