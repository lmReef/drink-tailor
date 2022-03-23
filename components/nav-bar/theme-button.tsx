import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

import { colors } from '../../styles/theme';
import { changeTheme, selectTheme } from '../../styles/themeSlice';

const StyledButton = styled.div`
  width: 4rem;
  height: 2rem;

  margin: auto 1rem;

  background-color: ${colors.secondary};
  border-radius: 110px;
  cursor: pointer;
`;

const StyledSwitch = styled.div`
  position: relative;
  width: 2rem;
  height: 2rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${colors.accent};
  border-radius: 110px;

  transition: right 0.1s ease-in-out;

  &.dark {
    right: -2rem;
  }
  &.light {
    right: 0;
  }

  svg {
    color: ${colors.primary};
  }
`;

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const clickHandler = () => {
    // redux state change
    dispatch(changeTheme(null));
  };

  return (
    <StyledButton onClick={clickHandler}>
      <StyledSwitch className={theme}>
        <FontAwesomeIcon icon={theme === 'dark' ? faMoon : faSun} />
      </StyledSwitch>
    </StyledButton>
  );
};

export default ThemeButton;
