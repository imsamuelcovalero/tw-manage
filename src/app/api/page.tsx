/* File: src/app/api/page.tsx */
import httpProxy from "http-proxy";
import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

const playerProxy = (req: NextApiRequest, res: NextApiResponse) => {
  const allyCode = req.query.allyCode as string;
  const targetUrl = `https://swgoh.gg/api/player/${allyCode}/`;

  return new Promise<void>((resolve, reject) => {
    const proxy = httpProxy.createProxy();
    proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
      changeOrigin: true,
      target: targetUrl,
    });
  });
};

export default playerProxy;
