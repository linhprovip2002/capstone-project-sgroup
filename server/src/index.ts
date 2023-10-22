import express from 'express';
import routers  from './router/index';
import { dbConfig } from './database/config';
import { errorHandler } from './middleware';
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api', routers);


app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  return res.send('pong');
});

app.use(errorHandler);
dbConfig.connect();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
