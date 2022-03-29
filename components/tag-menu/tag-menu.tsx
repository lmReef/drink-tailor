import styled from 'styled-components';
import { breakpoints_max, colors } from '../../styles/theme';
import Filter from './filter';

const TagMenuContainer = styled.div`
  height: 100%;
  width: 30%;
  min-width: 30rem;
  position: relative;

  padding: 0.8rem;
  background-color: ${colors.background2};

  @media only screen and (max-width: ${breakpoints_max.lg}) {
    display: none;
  }
`;

const TagMenu = ({ hidden, handler }) => {
  return (
    <TagMenuContainer className={hidden && 'side-menu-hidden'}>
      <Filter />
    </TagMenuContainer>
  );
};

export default TagMenu;
