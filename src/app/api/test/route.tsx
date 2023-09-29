/* File: src/app/api/test/route.tsx */
import { NextApiRequest } from 'next';

export async function GET(req: NextApiRequest) {
  return new Response("This is a new API route");
}