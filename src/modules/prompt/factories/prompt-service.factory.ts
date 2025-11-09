import BadRequestException from '../../../shared/exceptions/bad-request.exception';
import { SemanticCacheService } from '../../semantic_cache/services/core/semantic-cache.service';
import { LlmProvider } from '../interfaces/llm-provider.interface';
import { DeepSeekPromptService } from '../services/deepseek-prompt.service';
import { GeminiPromptService } from '../services/gemini-prompt.service';
import { createApi } from './api.factory';

export function createPromptService(provider: LlmProvider) {
  const semanticCache = new SemanticCacheService();
  const api = createApi(provider);
  switch (provider) {
    case 'deepseek':
      return new DeepSeekPromptService(api, semanticCache);
    case 'gemini':
      return new GeminiPromptService(api, semanticCache);
    default:
      throw new BadRequestException(`Unsupported LLM provider: ${provider}`);
  }
}
