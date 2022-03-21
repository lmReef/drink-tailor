import styled from 'styled-components';

import SideMenu from '../components/side-menu/side-menu';
import { colors } from '../styles/theme';
import Navbar from '../components/nav-bar/navbar';
import Content from '../components/content/content';

const Wrapper = styled.div`
  /* height = 100vh - height of navbar */
  height: calc(100vh - 4rem);

  display: flex;

  color: ${colors.text1};
  background-color: ${colors.background1};

  .row {
    display: flex;
    flex-direction: row;
  }
  .col {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const Index = () => {
  return (
    <>
      <Navbar />
      <Wrapper>
        <div className="row">
          <SideMenu />
          <div className="col">
            <Content />
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Index;
