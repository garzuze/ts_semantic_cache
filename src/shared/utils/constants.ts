import dotenv from 'dotenv';
import { cacheConfig } from '../../modules/semantic_cache/config/cache.config';
import { GeminiProvider } from '../../modules/semantic_cache/providers/gemini.provider';
import { EmbeddingService } from '../../modules/semantic_cache/services/core/embedding.service';

dotenv.config({ override: true });

export const PORT = process.env.PORT;

export const AI_INSTRUCTIONS = `Your are a unhelpful assistant. Always answer in a sarcastic tone. `;

export const DEEPSEEK_BASE_URL = process.env.DEEPSEEK_BASE_URL;

export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_TOKEN;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export const GEMINI_BASE_URL = process.env.GEMINI_BASE_URL;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export const embeddingService = new EmbeddingService(new GeminiProvider());

export const REDIS_SEARCH_QUERY = `*=>[KNN ${cacheConfig.vector.knnResults} @${cacheConfig.vector.field} $vec AS vector_score]`;

export const REDIS_URL = process.env.REDIS_URL;
