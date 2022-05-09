import {
  faHome,
  faQuestion,
  faStar,
  faTag,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import Link from 'next/link';
import { breakpoints_max, colors } from '../../styles/theme';
import { useRouter } from 'next/router';

const SideMenuContainer = styled.div`
  height: 100%;
  width: 4rem;
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
  z-index: 5;

  padding-top: 2rem;
  background-color: ${colors.background2};

  transition: all 0.2s ease-in-out;

  a:last-of-type {
    margin-top: auto;
  }

  .button-container {
    width: 100%;
    height: 4rem;

    padding: 1rem;
    margin: 0.5rem 0;
    cursor: pointer;

    svg {
      height: 100%;
      width: 100%;
      /* font-size: 1.5rem; */
    }

    :hover {
      background-color: ${colors.background1};
      filter: brightness(1) contrast(0.95) opacity(0.8);
    }

    &.active {
      /* background-color: ${colors.background1}; */
      svg {
        color: ${colors.accent};
      }
    }
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    height: 4rem;
    width: 100%;
    position: absolute;
    flex-direction: row;
    left: 0;
    bottom: 0;
    padding-top: 0;

    > a {
      flex-grow: 1;
    }

    .button-container {
      margin: 0;
    }
  }
`;

const SideMenu = () => {
  const router = useRouter();

  return (
    <SideMenuContainer>
      <Link href="/">
        <a>
          <div
            className={`button-container ${
              router.pathname === '/' ? 'active' : undefined
            }`}
          >
            <FontAwesomeIcon icon={faHome} />
          </div>
        </a>
      </Link>
      <Link href="/tags">
        <a>
          <div
            className={`button-container ${
              router.pathname === '/tags' ? 'active' : undefined
            }`}
          >
            <FontAwesomeIcon icon={faTag} />
          </div>
        </a>
      </Link>
      <Link href="/favourites">
        <a>
          <div
            className={`button-container ${
              router.pathname === '/favourites' ? 'active' : undefined
            }`}
          >
            <FontAwesomeIcon icon={faStar} />
          </div>
        </a>
      </Link>
      <Link href="/about">
        <a>
          <div
            className={`button-container ${
              router.pathname === '/about' ? 'active' : undefined
            }`}
          >
            <FontAwesomeIcon icon={faQuestion} />
          </div>
        </a>
      </Link>
    </SideMenuContainer>
  );
};

export default SideMenu;
