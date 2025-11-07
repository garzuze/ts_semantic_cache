import { AxiosInstance } from 'axios';
import { embeddingService } from '../../../../shared/utils/constants';
import { SemanticCacheService } from '../../../semantic_cache/services/core/semantic-cache.service';
import { IPromptService } from '../prompt.service.interface';
import { PromptResponse } from '../prompt-response.interface';

export abstract class BasePromptService implements IPromptService {
  constructor(
    protected readonly api: AxiosInstance,
    protected readonly semanticCache: SemanticCacheService,
  ) {}

  abstract generateAnswer(body: unknown): Promise<string>;
  abstract createPromptObject(prompt: string): unknown;

  async sendPrompt(prompt: string): Promise<PromptResponse> {
    // Try semantic cache first
    const cache = await this.semanticCache.lookup(prompt);
    if (cache) return cache;

    // Otherwise call api
    const promptObject = this.createPromptObject(prompt);
    const answer = await this.generateAnswer(promptObject);

    // Store for future reuse
    const id = this.generatePromptId();
    const embedding = await embeddingService.get(prompt);
    await this.semanticCache.store({ id, prompt, answer, embedding });

    return { source: 'llm', prompt, answer, id };
  }

  protected generatePromptId(): string {
    return `${Date.now()}${Math.random().toString(36).slice(2, 8)}`;
  }
}
