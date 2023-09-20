/* File: api/player.ts */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const allyCode = req.query.allyCode as string;
  const apiUrl = `https://swgoh.gg/api/player/${allyCode}/`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        error: `HTTP error! Status: ${response.status}`
      });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({ error: "Internal server error" });
  }
}