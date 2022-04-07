import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globals';
import store from '../app/store';
import CustomThemeProvider from '../components/custom-theme-provider';
import Script from 'next/script';

function App({ Component, pageProps }) {
  return (
    <>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1450000289109452"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Provider store={store}>
        <CustomThemeProvider>
          <GlobalStyle />
          <Component {...pageProps} />
        </CustomThemeProvider>
      </Provider>
    </>
  );
}

export default App;
