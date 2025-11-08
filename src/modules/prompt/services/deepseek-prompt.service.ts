import { AxiosInstance } from 'axios';
import { AI_INSTRUCTIONS } from '../../../shared/utils/constants';
import { SemanticCacheService } from '../../semantic_cache/services/core/semantic-cache.service';
import { BasePromptService } from '../interfaces/abstract/base-prompt-service';
import { DeepSeekRequestBody } from '../interfaces/deepseek-request-body.interface';

export class DeepSeekPromptService extends BasePromptService {
  constructor(
    readonly api: AxiosInstance,
    readonly semanticCache: SemanticCacheService,
  ) {
    super(api, semanticCache);
  }

  async generateAnswer(body: DeepSeekRequestBody): Promise<string> {
    const response = await this.api.post('/completions', body);
    const answer = response.data.choices[0].message.content as string;
    return answer;
  }

  createPromptObject(prompt: string): DeepSeekRequestBody {
    return {
      model: 'deepseek-chat',
      messages: [
        {
          role: 'system',
          content: AI_INSTRUCTIONS,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    };
  }
}
