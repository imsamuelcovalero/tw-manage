/* File: src/middleware/cors.ts */
import { createRouter } from 'next-connect';
import cors from 'cors';

const corsOptions = {
  origin: '*',  // substitua por sua origem real
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

const middleware = createRouter();

middleware.use(cors(corsOptions));

export default middleware;