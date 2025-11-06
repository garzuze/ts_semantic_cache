import type { Request, Response } from 'express';
import express from 'express';
import { createClient, RESP_TYPES } from 'redis';
import { promptRouter } from './modules/prompt/routes/prompt.routes';
import { cacheConfig } from './modules/semantic_cache/config/cache.config';
import { createIndexIfNotExists } from './modules/semantic_cache/services/storage/index-management.service';
import errorHandler from './shared/middlewares/error-handler.middleware';
import { embeddingService, PORT } from './shared/utils/constants';

const app = express();

export const redisClient = createClient({
  url: cacheConfig.redis.url,
}).withTypeMapping({
  [RESP_TYPES.BLOB_STRING]: Buffer,
});

(async () => {
  redisClient.on('error', (err) => console.log('Redis Client Error', err));
  redisClient.on('ready', () => console.log('redis client started'));
})();

app.use(express.json());

app.listen(PORT || 3000, async () => {
  await redisClient.connect();

  const sampleEmb = await embeddingService.get('lucas');
  const dimensions = sampleEmb.length|| cacheConfig.vector.dimmensions;
  await createIndexIfNotExists(dimensions);

  app.use('/v1', promptRouter);

  app.use(errorHandler);

  app.get('/', (req: Request, res: Response) => {
    res.json({
      working: 'fine',
    });
  });

  app.use((_req, res, _next) => {
    res.status(404).json({ error: 'Route not found' });
  });

  console.log(`Server running on port ${PORT}`);
});
