import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { breakpoints_max, colors } from '../../styles/theme';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const StyledSearchbar = styled.div`
  position: relative;
  display: flex;

  width: 30rem;
  margin: auto auto;

  input {
    position: relative;
    width: 100%;
    padding: 0.5rem 1rem;

    font-size: 1.2rem;
    background-color: ${colors.secondary};
    border-radius: 110px;
    border: none;

    :focus {
      outline: none;
    }
  }

  svg {
    /* TODO: this is kinda gross, should probably reimplement */
    position: absolute;
    height: 1.5rem;
    top: 50%;
    right: 0;
    transform: translate(-1rem, -0.75rem);
    color: ${colors.text2};
    cursor: pointer;
  }

  @media only screen and (max-width: ${breakpoints_max.sm}) {
    max-width: 65%;
    margin-left: 0;
  }
`;

const Searchbar = () => {
  const router = useRouter();
  const input = useRef<HTMLInputElement>();

  const searchForDrink = (name) => {
    router.push(`/search?name=${name}`);
  };

  useEffect(() => {
    input.current.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') searchForDrink(input.current.value);
    });

    return input.current.removeEventListener('keyup', ({ key }) => {
      if (key === 'Enter') searchForDrink(input.current.value);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  useEffect(() => {
    if (router.pathname.includes('/search'))
      input.current.value = router.query.name as string;
  }, [router.pathname, router.query]);

  return (
    <StyledSearchbar>
      <input type="text" placeholder="Search for a drink..." ref={input} />
      <FontAwesomeIcon
        icon={faSearch}
        onClick={() => searchForDrink(input.current.value)}
      />
    </StyledSearchbar>
  );
};

export default Searchbar;
