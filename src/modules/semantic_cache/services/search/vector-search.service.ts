import { redisClient } from '../../../../server';
import { REDIS_SEARCH_QUERY } from '../../../../shared/utils/constants';
import { cacheConfig } from '../../config/cache.config';
import { FtRawSearchResult } from '../../interfaces/ft-raw-search-result.interface';

export async function getVectorSearchResult(buffer: Buffer<ArrayBufferLike>) {
  // Will perform search with KNN algorithm
  return (await redisClient.sendCommand([
    'FT.SEARCH',
    cacheConfig.redis.index,
    REDIS_SEARCH_QUERY,
    'PARAMS',
    '2',
    'vec',
    buffer, // Send prompt buffer as paremeter
    'SORTBY',
    'vector_score', // Sort by simarlity punctuation
    'RETURN',
    '2',
    'answer',
    'prompt', // Returns only prompt and answer
    'DIALECT',
    '2', // RedisSearch syntax version 2
  ])) as FtRawSearchResult;
}
