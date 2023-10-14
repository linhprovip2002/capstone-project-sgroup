import express from 'express';
import env from 'dotenv';
import cacheService from './cacheService';
import routers  from './router/index';
import api from './api';
import { dbConfig } from './database/config';
import { errorHandler } from './middleware';
env.config();
console.log(process.env.REDIS_URL);
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const useCache = true; // Change to true to use cache, or false to use the api module
app.use('/api', routers);
const apiTest = useCache ? cacheService : api;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  return res.send('pong');
});

app.get('/products',async (_req, res) => {
  try {
    const products = await apiTest.getProducts();
    return res.status(200).json({ products });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

app.use(errorHandler);
dbConfig.connect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
