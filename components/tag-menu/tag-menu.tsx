import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { breakpoints_max, colors } from '../../styles/theme';
import Filter from './filter';

const TagMenuContainer = styled.div`
  height: 100%;
  width: 30%;
  min-width: 30rem;
  position: relative;
  z-index: 2;
  overflow: hidden;

  padding: 0.8rem;
  background-color: ${colors.background2};

  // TODO: fix the transform flicker
  transition: left 0.1s ease-in-out;
  left: 0;

  &.hidden {
    left: -101vw;
  }

  .side-menu-close {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    padding: 1rem;
    margin-right: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    height: calc(100% - 4rem); // minus the padding of nav menu
    width: 100%;
    position: absolute;
    min-width: 0;

    .side-menu-close {
      display: unset;
    }
  }
`;

const TagMenu = ({ hidden, handler }) => {
  return (
    <TagMenuContainer className={hidden ? 'hidden' : undefined}>
      <div className="side-menu-close" onClick={handler}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <Filter />
    </TagMenuContainer>
  );
};

export default TagMenu;
