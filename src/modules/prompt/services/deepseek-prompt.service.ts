import api from '../../../shared/services/api';
import { AI_INSTRUCTIONS } from '../../../shared/utils/constants';
import { SemanticCacheService } from '../../semantic_cache/services/core/semantic-cache.service';
import { BasePromptService } from '../interfaces/abstract/base-prompt-service';
import { DeepSeekRequestBody } from '../interfaces/request-body.interface';

export class DeepSeekPromptService extends BasePromptService {
  constructor(readonly semanticCache: SemanticCacheService) {
    super(semanticCache);
  }

  async generateAnswer(body: DeepSeekRequestBody): Promise<string> {
    const response = await api.post('/completions', body);
    const answer = response.data.choices[0].message.content as string;
    return answer;
  }

  createPromptObject(prompt: string): unknown {
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
