/* File: src/server.ts */
import express from 'express';
import next from 'next';
// import httpProxy from 'http-proxy';
import fetch from 'node-fetch'; // Importe o node-fetch no topo

const port = parseInt(process.env.PORT || '3000', 10);
console.log(`> Starting on port: ${port}`);

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// const proxy = httpProxy.createProxy();


// Prepara a aplicação Next.js para manipulação
nextApp.prepare().then(() => {
  console.log('Next.js app prepared');

  const app = express();

  const BASE_API_URL = 'https://swgoh.gg/api/';

  function constructUrl(endpoint: string): string {
    return `${BASE_API_URL}${endpoint}`;
  }

  app.get('/api/guild-profile', async (req, res) => {
    const guildId = req.query.guildId as string;
    console.log('guildId_S', guildId);

    if (!guildId) {
      return res.status(400).send("Guild ID is required");
    }

    const targetUrl = constructUrl(`guild-profile/${guildId}/`);

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // console.log('data', data.data.members);

      res.json(data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get('/api/player', async (req, res) => {
    const allyCode = req.query.allyCode as string;
    // console.log('allyCode', allyCode);


    if (!allyCode) {
      return res.status(400).send("AllyCode is required");
    }

    const targetUrl = constructUrl(`player/${allyCode}/`);
    // console.log('targetUrl', targetUrl);


    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get('/api/units', async (_req, res) => {
    const targetUrl = constructUrl(`units/`);

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  app.get('/api/ships', async (_req, res) => {
    const targetUrl = constructUrl(`ships/`);

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      res.status(500).send("Internal Server Error");
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