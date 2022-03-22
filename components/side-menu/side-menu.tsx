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

  @media only screen and (max-width: ${breakpoints_max.lg}) {
    display: none;
  }
`;

const SideMenu = () => {
  return (
    <SideMenuContainer>
      <Filter />

      {/* <Button className="button-find" text="Find"  /> */}
      {/* TODO: make a button to clear em all */}
    </SideMenuContainer>
  );
};

export default SideMenu;
