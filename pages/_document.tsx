// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <Html>
            {initialProps.styles}
            {sheet.getStyleElement()}
            <title>Drink Tailor</title>
            <meta name="description" content="Cocktail recommender" />
            {/* disable user scale because we dont want it on mobile */}
            {/* esp because input ele zoom */}
            <meta
              name="viewport"
              content="initial-scale=1.0, user-scalable=no"
            />
            {/* google verification */}
            <meta
              name="google-site-verification"
              content="4lu8PXHVMqY8XR3nnFwfuG8XULRJEO3PymODSnwfqM4"
            />

            <link rel="shortcut icon" href="/assets/images/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/assets/images/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/assets/images/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/assets/images/favicon-16x16.png"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Quicksand&display=swap"
              rel="stylesheet"
            />
          </Html>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
}
