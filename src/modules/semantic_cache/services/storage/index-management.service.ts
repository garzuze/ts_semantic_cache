import { redisClient } from '../../../../server';
import { cacheConfig } from '../../config/cache.config';

export async function createIndexIfNotExists(
  dim = cacheConfig.vector.dimmensions,
) {
  // Creates search structure:
  // FT.CREATE idx:prompts ON HASH PREFIX 1 doc: SCHEMA prompt TEXT answer TEXT embedding VECTOR HNSW 6 TYPE FLOAT32 DIM 1536 DISTANCE_METRIC COSINE
  // Data is stored in Redis Hashes
  // RediSearch Index is a separate search structure
  try {
    await redisClient.sendCommand([
      'FT.CREATE', // Crie um index de pesquisa full-text
      cacheConfig.redis.index, // Index name
      'ON',
      'HASH', // Create a search index that stores Redis Hash data
      'PREFIX',
      '1', // Filter only hashes whose key matches specific pattern
      cacheConfig.redis.prefix, // Filter hashes whose key starts with this prefix
      'SCHEMA', // How it should interpret data in the hash
      'prompt',
      'TEXT', // prompt as text
      'answer',
      'TEXT',
      cacheConfig.vector.field,
      'VECTOR', // embeddings as vectors
      cacheConfig.vector.indexType,
      '6',
      'TYPE',
      'FLOAT32',
      'DIM',
      String(dim),
      'DISTANCE_METRIC',
      cacheConfig.vector.distanceMetric,
    ]);
    console.log('RediSearch index created:', cacheConfig.redis.index);
    // Process: verifies index -> returns relevant keys list -> search specific hashes
  } catch (err) {
    const msg = String(err.message || err);
    if (msg.includes('Index already exists')) {
      console.log('Index already exists');
    } else {
      console.error('Erro while trying to create index:', err);
      throw err;
    }
  }
}
