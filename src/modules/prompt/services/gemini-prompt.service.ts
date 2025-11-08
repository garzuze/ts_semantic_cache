import {
  GeminiPreferenceExample,
  GenerateContentResponse,
} from '@google/genai';
import { AxiosInstance } from 'axios';
import { AI_INSTRUCTIONS } from '../../../shared/utils/constants';
import { SemanticCacheService } from '../../semantic_cache/services/core/semantic-cache.service';
import { BasePromptService } from '../interfaces/abstract/base-prompt-service';

export class GeminiPromptService extends BasePromptService {
  constructor(
    readonly api: AxiosInstance,
    readonly semanticCache: SemanticCacheService,
  ) {
    super(api, semanticCache);
  }

  async generateAnswer(body: GeminiPreferenceExample): Promise<string> {
    const response = await this.api.post<GenerateContentResponse>(
      '/gemini-2.5-flash:generateContent',
      body,
    );
    const answer = response.data.candidates[0].content.parts[0].text;
    return answer;
  }

  createPromptObject(prompt: string): GeminiPreferenceExample {
    return {
      contents: [
        {
          role: 'model',
          parts: [
            {
              text: AI_INSTRUCTIONS,
            },
          ],
        },
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };
  }
}
