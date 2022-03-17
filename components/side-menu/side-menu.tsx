import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { breakpoints_min, breakpoints_max, colors } from '../../styles/theme';
import Button from '../common/button';
import Filter from './filter/filter';

const SideMenuContainer = styled.div`
  height: 100%;
  width: 30%;
  min-width: 30rem;

  padding: 0.8rem;

  background-color: ${colors.background2};

  .button- {
    &find {
      position: absolute;
      bottom: 10px;
      margin: 0 auto 0 auto;
    }
  }
`;

const SideMenu = ({ handleTagChange }) => {
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
  }, [activeTags, handleTagChange]);

  return (
    <SideMenuContainer>
      <Filter activeTags={activeTags} handleTagClick={handleTagClick} />

      {/* <Button className="button-find" text="Find"  /> */}
    </SideMenuContainer>
  );
};

export default SideMenu;
