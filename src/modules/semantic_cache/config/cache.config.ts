import { REDIS_URL } from '../../../shared/utils/constants';
import { CacheConfig } from '../interfaces/cache.config.interface';

export const cacheConfig: CacheConfig = {
  redis: {
    index: 'idx:prompts',
    prefix: 'doc',
    expiration: 60 * 60 * 24 * 30, // 30 days
    url: REDIS_URL || 'redis://redis:6379',
  },
  vector: {
    field: 'embedding',
    dimmensions: 1536,
    knnResults: 4,
    similarityThreshold: 0.82,
    indexType: 'HNSW', // Hierarchical Navigable Small World Algorithm
    distanceMetric: 'COSINE', // Cosine distance metric to check string simarlity
  },
};
