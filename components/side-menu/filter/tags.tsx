import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { colors } from '../../../styles/theme';

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
  color: ${colors.text};

  border-radius: 10px;
  cursor: pointer;

  transition: all 0.13s ease-out;

  &:hover {
    transform: translateY(-0.2rem);
  }

  &.inactive {
    filter: brightness(1) contrast(0.7) opacity(0.8);
    background-color: ${colors.primary};
    color: ${colors.background1};
  }
  &.active {
    filter: brightness(1) contrast(1) opacity(1);
    background-color: ${colors.accent};
    color: ${colors.background1};
  }
  &.disabled {
    filter: brightness(0.8) contrast(1) opacity(1);
    background-color: ${colors.accent};
    color: ${colors.text};
  }

  svg {
    height: 0.5rem;
  }
`;

const Tag = ({ name, activeTags, handleTagClick }) => {
  const ref = useRef(null);
  const [activeState, setActiveState] = useState('inactive');

  useEffect(() => {
    setActiveState(activeTags.includes(name) ? 'active' : 'inactive');
  }, [activeTags, name]);

  // left click
  const handleLeftClick = () => {
    if (activeState !== 'active') setActiveState('active');
    else setActiveState('inactive');
  };

  return (
    <StyledDiv
      ref={ref}
      className={`tag ${activeState}`}
      onClick={() => {
        handleTagClick(name);
      }}
    >
      {name}
    </StyledDiv>
  );
};

const Tags = ({ tags, activeTags, handleTagClick }) => {
  tags.sort();

  return (
    <div className="tags">
      {tags.map((tag, index) => {
        return (
          <Tag
            key={index}
            name={tag}
            activeTags={activeTags}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
};

export default Tags;
