import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { breakpoints_max, colors } from '../../styles/theme';
import { useEffect, useRef, useState } from 'react';
import api from '../common/axios-setup';
import { useDispatch } from 'react-redux';
import { clearDrinks, setDrinks } from '../content/drinksSlice';

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
    translate: -1rem -0.75rem;
    color: ${colors.text2};
    cursor: pointer;
  }

  @media only screen and (max-width: ${breakpoints_max.lg}) {
    display: none;
  }
`;

const Searchbar = () => {
  const dispatch = useDispatch();
  const [timeoutID, setTimeoutID] =
    useState<ReturnType<typeof setTimeout>>(null);
  const input = useRef<HTMLInputElement>();

  const searchForDrink = async (name) => {
    const drinksRes: DrinkBasic[] = await (
      await api.get('/api/get/drinks-by-name?name=' + name)
    ).data;
    dispatch(setDrinks(drinksRes));
  };

  const handleChange = () => {
    if (typeof input?.current !== 'undefined') {
      const text = input.current.value || '';

      if (text) {
        if (timeoutID) clearTimeout(timeoutID);
        setTimeoutID(
          setTimeout(() => {
            searchForDrink(text);
            setTimeoutID(null);
          }, 1000),
        );
      } else {
        dispatch(clearDrinks());
      }
    }
  };

  useEffect(() => {
    input.current.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter') {
        // Do work
      }
    });
  }, [input]);

  return (
    <StyledSearchbar>
      <input
        type="text"
        placeholder="Search for a drink..."
        ref={input}
        onChange={handleChange}
      />
      <FontAwesomeIcon icon={faSearch} />
    </StyledSearchbar>
  );
};

export default Searchbar;
