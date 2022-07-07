import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globals';
import store from '../app/store';
import CustomThemeProvider from '../components/custom-theme-provider';
import Script from 'next/script';

function App({ Component, pageProps }) {
  return (
    <>
      {/* Ads */}
      {/* Analytics */}
      <Script
        strategy="lazyOnload"
        src={'https://www.googletagmanager.com/gtag/js?id=G-30X14WKX91'}
      />
      <Script strategy="lazyOnload" id="google-analytics-inline">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-30X14WKX91', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
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
