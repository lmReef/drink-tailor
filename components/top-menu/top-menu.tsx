import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../styles/theme';
import Tags from '../common/tags/tags';
import { selectAllTags } from '../common/tags/tagSlice';
import { useEffect, useState } from 'react';

const StyledTopMenu = styled.div`
  width: 100%;
  height: 3.5rem;
  position: sticky;
  top: 0;

  background-color: ${colors.background2};
  transition: top 0.3s ease-in-out;
  z-index: 5;

  &.hidden {
    top: -3.5rem;
  }

  .tags {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;

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
  const [hide, setHide] = useState<boolean>(false);

  useEffect(() => {
    let prevScrollpos = 0;
    const content = document.getElementById('content');

    const onScroll = () => {
      const currentScrollPos = content.scrollTop;
      if (prevScrollpos > currentScrollPos) {
        // document.getElementById('top-menu').style.top = '0';
        setHide(false);
      } else {
        // document.getElementById('top-menu').style.top = '-3.5rem';
        setHide(true);
      }
      prevScrollpos = currentScrollPos;
    };

    content.addEventListener('scroll', onScroll);

    return () => content.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <StyledTopMenu id="top-menu" className={hide && 'hidden'}>
      <Tags tags={tags} sort={false} icon={faTimes} />
    </StyledTopMenu>
  );
};

export default TopMenu;
