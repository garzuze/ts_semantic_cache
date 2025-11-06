import { redisClient } from '../../../../server';
import { PromptResponse } from '../../../prompt/interfaces/prompt-response.interface';
import { cacheConfig } from '../../config/cache.config';
import { ParsedDocument } from '../../interfaces/vector-search-result.interface';
import { bufferToFloat32Array } from '../../utils/buffer-to-float32';
import { cosineSimilarity } from '../../utils/cosine-similarity';

export async function getCachedAnswer(
  embedding: Float32Array<ArrayBufferLike>,
  docs: ParsedDocument[],
): Promise<PromptResponse> {
  // refetch best candidates stored embeddings and calculte cosine simarlity
  for (const doc of docs) {
    const docKey = doc.id;
    // HGET returns embedding as buffer
    const embBuf = (await redisClient.HGET(
      docKey,
      cacheConfig.vector.field,
    )) as Buffer<ArrayBufferLike>;

    if (!embBuf || embBuf === undefined) continue;
    const storedVec = bufferToFloat32Array(Buffer.from(embBuf));
    const sim = cosineSimilarity(embedding, storedVec);
    if (sim >= cacheConfig.vector.similarityThreshold) {
      return {
        source: 'cache',
        id: docKey,
        prompt: doc.prompt,
        answer: doc.answer,
        score: sim,
      };
    }
  }

  return null;
}
