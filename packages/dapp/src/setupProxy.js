const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/etherPriceCoinGecko',
    createProxyMiddleware({
      target: 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD',
      changeOrigin: true,
    })
  );
};
