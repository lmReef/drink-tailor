import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../styles/theme';
import Tags from '../common/tags/tags';
import { selectAllTags } from '../common/tags/tagSlice';

const StyledTopMenu = styled.div`
  width: 100%;
  height: 3.5rem;

  background-color: ${colors.background2};

  .tags {
    display: flex;
    flex-direction: row;
    margin: 0.5rem;

    .tag {
      height: 1.5rem;
      width: fit-content;
      min-width: unset;
      padding: 0.2rem 0.8rem;
      margin: auto 0.3rem;
      border-radius: 9001px;

      :hover {
        transform: none;
      }

      svg {
        height: 70%;
        left: 0;
        margin-right: 0.3rem;
      }
    }
  }
`;

const TopMenu = () => {
  const tags = useSelector(selectAllTags);

  return (
    <StyledTopMenu>
      <Tags tags={tags} sort={false} icon={faTimes} />
    </StyledTopMenu>
  );
};

export default TopMenu;
