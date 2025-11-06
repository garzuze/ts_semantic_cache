import { redisClient } from '../../../../server';
import { cacheConfig } from '../../config/cache.config';
import { RedisDocument } from '../../interfaces/document.interface';

export async function storeRedisDocument({
  key,
  prompt,
  answer,
  embeddingBuffer,
}: RedisDocument) {

  // Uses HSET algorithm with binary embedding. sendCommand allows buffers as paremeters.
  await redisClient.sendCommand([
    'HSET',
    key,
    'prompt',
    prompt,
    'answer',
    answer,
    cacheConfig.vector.field,
    embeddingBuffer,
  ]);
  
  // Creates a hash like
  // Key: "doc:001"
  //  Fields:
  //    prompt: "How to hide a b..."
  //    answer: "Great question!..."
  //    embedding: [embedding buffer]
  await redisClient.expire(key, cacheConfig.redis.expiration);
}
