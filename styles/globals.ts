import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    overflow-y: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    font-family: Quicksand, sans-serif;
    /* font-family: Quicksand, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; */
  }

  h1,
  h2,
  h3 {
    font-weight: normal;
  }

  .main-wrapper {
    /* height = 100vh - height of navbar */
    height: calc(100vh - 4rem);

    display: flex;

    color: ${colors.text1};
    background-color: ${colors.background1};

    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
    }
    .col {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default GlobalStyle;
