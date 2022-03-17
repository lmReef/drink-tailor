import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import store from '../app/store';
import CustomThemeProvider from '../components/custom-theme-provider';

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <Component {...pageProps} />
      </CustomThemeProvider>
    </Provider>
  );
}

export default App;
