import styled from 'styled-components';
import { breakpoints_min, breakpoints_max } from '../../styles/theme';

const StyledButton = styled.button`
  padding: 0.75rem 2rem;

  font-size: 1rem;
  font-family: Quicksand;
  letter-spacing: 1px;

  background-color: ${(props) => props.theme[0]};
  border: 0;
  border-radius: 200px;
  cursor: pointer;
`;

const Button = ({ text, theme, className }) => {
  return (
    <StyledButton className={className} theme={theme}>
      {text}
    </StyledButton>
  );
};

export default Button;
