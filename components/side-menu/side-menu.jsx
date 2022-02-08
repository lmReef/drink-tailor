import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { breakpoints_min, breakpoints_max } from '../../styles/theme';
import Button from '../button';
import Filter from './filter/filter';

const SideMenuContainer = styled.div`
  height: 100%;
  width: 30%;

  padding: 0.8rem;

  /* border: 0 solid ${(props) => props.theme[3]};
  border-width: 0 3px 0 0; */
  background-color: ${(props) => props.theme[3]};

  .button- {
    &find {
      position: absolute;
      bottom: 10px;
      margin: 0 auto 0 auto;
    }
  }
`;

const SideMenu = ({ theme, handleTagChange }) => {
  // TODO: button to clear all activeTags
  const [activeTags, setActiveTags] = useState([]);

  const handleTagClick = (name) => {
    if (!activeTags.includes(name))
      setActiveTags((activeTags) => [...activeTags, name]);
    else
      setActiveTags((activeTags) => [
        ...activeTags.filter((tag) => tag !== name),
      ]);
  };

  useEffect(() => {
    handleTagChange(activeTags);
  }, [activeTags]);

  return (
    <SideMenuContainer theme={theme}>
      <Filter
        theme={theme}
        activeTags={activeTags}
        handleTagClick={handleTagClick}
      />

      {/* <Button className="button-find" text="Find" theme={theme} /> */}
    </SideMenuContainer>
  );
};

export default SideMenu;
