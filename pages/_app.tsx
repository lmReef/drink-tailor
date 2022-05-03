import { Provider } from 'react-redux';

import GlobalStyle from '../styles/globals';
import store from '../app/store';
import CustomThemeProvider from '../components/custom-theme-provider';
import Script from 'next/script';

function App({ Component, pageProps }) {
  return (
    <>
      {/* Google stuff */}
      {/* Ads */}
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-1450000289109452"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1450000289109452"
      />
      {/* Analytics */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script strategy="lazyOnload" id="google-analytics-inline">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
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
