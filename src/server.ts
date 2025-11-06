import express from 'express';
import { PORT } from './shared/utils/constants';

const app = express();

app.use(express.json());

app.listen(PORT || 3000, async () => {

  app.use((_req, res, _next) => {
    res.status(404).json({ error: 'Route not found' });
  });

  console.log(`Server running on port ${PORT}`);
});
