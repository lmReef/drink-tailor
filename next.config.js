module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '(https?://)?www.drinktailor.net/:slug*',
        destination: 'https://drinktailor.net/:slug*',
        permanent: true,
        basePath: false,
      },
    ];
  },
};
