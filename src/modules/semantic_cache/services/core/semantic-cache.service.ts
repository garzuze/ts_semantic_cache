import { embeddingService } from "../../../../shared/utils/constants";
import { PromptResponse } from "../../../prompt/interfaces/prompt-response.interface";
import { cacheConfig } from "../../config/cache.config";
import { Document } from "../../interfaces/document.interface";
import { float32ArrayToBuffer } from "../../utils/float32-to-buffer";
import { getCachedAnswer } from "../search/cached-answer.service";
import { parseVectorSearch } from "../search/parse-vector-search.service";
import { getVectorSearchResult } from "../search/vector-search.service";
import { storeRedisDocument } from "../storage/document-storage.service";

class SemanticCacheService {
  async lookup(prompt: string): Promise<PromptResponse> {
    const embedding = await embeddingService.get(prompt);
    const buffer = float32ArrayToBuffer(embedding);

    const searchResult = await getVectorSearchResult(buffer);
    const parsedSearchResult = parseVectorSearch(searchResult);

    if (parsedSearchResult.total === 0) return null;

    const cachedAnswer = getCachedAnswer(embedding, parsedSearchResult.docs);
    return cachedAnswer;
  }

  async store({ id, prompt, answer, embedding }: Document): Promise<void> {
    const key = `${cacheConfig.redis.prefix}:${id}`; // doc:id -> prompt unique address

    const embeddingBuffer = float32ArrayToBuffer(embedding as Float32Array);

    return await storeRedisDocument({ key, prompt, answer, embeddingBuffer });
  }
}

export { SemanticCacheService };

