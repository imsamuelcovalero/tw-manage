/* File: src/server.ts */
import express from 'express';
import next from 'next';
import httpProxy from 'http-proxy';
import fetch from 'node-fetch'; // Importe o node-fetch no topo

const port = parseInt(process.env.PORT || '3000', 10);
console.log(`> Starting on port: ${port}`);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

const proxy = httpProxy.createProxy();

// Prepara a aplicação Next.js para manipulação
nextApp.prepare().then(() => {
  console.log('Next.js app prepared');

  const app = express();

  // Proxy para a API
  app.get('/api/playerProxy', async (req, res) => {
    const allyCode = req.query.allyCode as string;
    console.log('allyCode', allyCode);

    const targetUrl = `https://swgoh.gg/api/player/${allyCode}/`;

    try {
      // const fetch = (await import('node-fetch')).default;
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data); // Envie os dados para o cliente

    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      res.status(500).send("Internal Server Error"); // Envie um erro ao cliente
    }
  });

  // Manipula todos os outros pedidos com o Next.js
  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  app.listen(port, (err?: unknown) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});