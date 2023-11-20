import express from 'express';
import routers  from './router/index';
import { dbConfig } from './database/config';
import { errorHandler } from './middleware';
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/api', routers);




app.use(errorHandler);
app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  return res.send('pong');
});

dbConfig.connect();


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
