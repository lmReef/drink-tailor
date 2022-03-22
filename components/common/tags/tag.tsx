import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';
import { addTag, removeTag, selectAllTags, selectTag } from './tagSlice';

// TODO: make the tags look better
const StyledDiv = styled.div`
  height: 4rem;
  width: fit-content;
  min-width: 5rem;
  margin: 0.5rem;
  padding: 0.45rem 0.9rem;

  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;

  font-size: 0.95rem;
  text-align: center;
  user-select: none;
  color: ${colors.text2};

  border-radius: 10px;
  cursor: pointer;

  transition: all 0.13s ease-out;

  &:hover {
    transform: translateY(-0.2rem);
  }

  &.inactive {
    filter: brightness(1) contrast(0.85) opacity(0.8);
    background-color: ${colors.primary};
    color: ${colors.text2};
  }
  &.active {
    filter: brightness(1) contrast(1) opacity(1);
    background-color: ${colors.accent};
    color: ${colors.background1};
  }

  svg {
    height: 0.5rem;
  }
`;

const Tag = ({ name, icon = null }) => {
  const dispatch = useDispatch();
  const activeState = useSelector((state) => selectTag(state, name));

  const handleClick = () => {
    dispatch(activeState ? removeTag(name) : addTag(name));
  };

  return (
    <StyledDiv
      className={`tag ${activeState ? 'active' : 'inactive'}`}
      onClick={handleClick}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {name}
    </StyledDiv>
  );
};

export default Tag;
