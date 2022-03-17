import styled from 'styled-components';
import { breakpoints_min, breakpoints_max, colors } from '../../styles/theme';

const StyledButton = styled.button`
  position: absolute;

  padding: 0.75rem 2rem;

  font-size: 1rem;
  font-family: Quicksand;
  letter-spacing: 1px;

  background-color: ${colors.primary};
  border: 0;
  border-radius: 200px;
  cursor: pointer;
`;

const Button = ({ text = '', className = null }) => {
  return <StyledButton className={className}>{text}</StyledButton>;
};

export default Button;
