/* src/api/proxy.ts */

// import { createProxyMiddleware } from 'http-proxy-middleware';

// export const config = {
//   api: {
//     bodyParser: false, // Desabilitar bodyParser para o proxy funcionar
//   },
// };

// export default createProxyMiddleware({
//   target: 'https://swgoh.gg',
//   changeOrigin: true,
//   pathRewrite: {
//     '^/api/': '/api/', // mantenha o prefixo /api/
//   },
//   // Outras opções do proxy aqui se necessário
// });