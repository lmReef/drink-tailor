import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { breakpoints_min, breakpoints_max, colors } from '../../styles/theme';
import Filter from './filter';

const SideMenuContainer = styled.div`
  height: 100%;
  width: 30%;
  min-width: 30rem;
  position: relative;
  left: 0;

  padding: 0.8rem;
  background-color: ${colors.background2};

  transition: left 0.2s ease-in-out;

  .close-side-menu-button {
    width: fit-content;
    height: fit-content;
    padding: 0.3rem 0.5rem;
    margin: 0.2rem 2rem;

    position: absolute;
    right: 0;

    cursor: pointer;

    svg {
      font-size: 1.5rem;
    }
  }

  &.side-menu-hidden {
    left: -40%;
  }

  @media only screen and (max-width: ${breakpoints_max.lg}) {
    display: none;
  }
`;

const SideMenu = ({ hidden, handler }) => {
  return (
    <SideMenuContainer className={hidden && 'side-menu-hidden'}>
      <div className="close-side-menu-button" onClick={handler}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <Filter />
    </SideMenuContainer>
  );
};

export default SideMenu;
