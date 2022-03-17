import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { colors } from '../../styles/theme';
import { changeTheme, selectTheme } from '../../styles/themeSlice';

const StyledButton = styled.div`
  width: 4rem;
  height: 2rem;

  margin: auto 1rem auto auto;

  background-color: ${colors.secondary};
  border-radius: 110px;
  cursor: pointer;
`;

const StyledSwitch = styled.div`
  position: absolute;
  width: 2rem;
  height: 2rem;

  background-color: ${colors.primary};
  border-radius: 110px;
  translate: -1rem;

  transition: right 0.1s ease-in-out;

  &.dark {
    right: 2rem;
  }
  &.light {
    right: 0;
  }
`;

const ThemeButton = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);

  const clickHandler = () => {
    // redux state change
    dispatch(changeTheme());
  };

  return (
    <StyledButton onClick={clickHandler}>
      <StyledSwitch className={theme}></StyledSwitch>
    </StyledButton>
  );
};

export default ThemeButton;
