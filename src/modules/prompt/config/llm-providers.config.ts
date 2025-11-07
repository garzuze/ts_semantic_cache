import {
  DEEPSEEK_BASE_URL,
  DEEPSEEK_TOKEN,
} from '../../../shared/utils/constants';
import { LlmProvider } from '../interfaces/llm-provider.interface';
import { LlmProviderConfig } from '../interfaces/llm-provider-config.interface';

export const llmProviders: Record<LlmProvider, LlmProviderConfig> = {
  deepseek: {
    baseURL: DEEPSEEK_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    token: DEEPSEEK_TOKEN,
  },
};
