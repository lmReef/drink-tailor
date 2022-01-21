import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

// TODO: make the tags look better
const StyledDiv = styled.div`
  height: fit-content;
  width: fit-content;
  min-width: 4rem;
  margin: 0.5rem;
  padding: 0.45rem 0.9rem;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 0.95rem;
  text-align: center;
  user-select: none;
  color: ${(props) => props.theme[2]};

  border-radius: 1000px;
  cursor: pointer;

  transition: all 0.13s ease-out;

  &:hover {
    transform: translateY(-0.2rem);
  }

  &.inactive {
    filter: brightness(1.1) contrast(0.7) opacity(0.8);
    background-color: ${(props) => props.theme[0]};
    color: ${(props) => props.theme[3]};
  }
  &.active {
    filter: brightness(0.9) contrast(0.9) opacity(1);
    background-color: ${(props) => props.theme[4]};
    color: ${(props) => props.theme[3]};
  }
  &.disabled {
    filter: brightness(0.8) contrast(1) opacity(1);
    background-color: ${(props) => props.theme[4]};
    color: ${(props) => props.theme[1]};
  }

  svg {
    height: 0.5rem;
  }
`;

const Tag = ({ name, activeTags, handleTagClick, theme }) => {
  const ref = useRef(null);
  const [activeState, setActiveState] = useState('inactive');

  useEffect(() => {
    setActiveState(activeTags.includes(name) ? 'active' : 'inactive');
  }, [activeTags]);

  // left click
  const handleLeftClick = () => {
    if (activeState !== 'active') setActiveState('active');
    else setActiveState('inactive');
  };

  return (
    <StyledDiv
      theme={theme}
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

const Tags = ({ tags, activeTags, handleTagClick, theme }) => {
  tags.sort();

  return (
    <div className="tags">
      {tags.map((tag, index) => {
        return (
          <Tag
            theme={theme}
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
