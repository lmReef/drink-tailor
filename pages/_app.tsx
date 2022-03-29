import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globals';
import store from '../app/store';
import CustomThemeProvider from '../components/custom-theme-provider';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
