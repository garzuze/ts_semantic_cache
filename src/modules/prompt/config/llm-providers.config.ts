import {
  DEEPSEEK_API_KEY,
  DEEPSEEK_BASE_URL,
  GEMINI_API_KEY,
  GEMINI_BASE_URL,
} from '../../../shared/utils/constants';
import { LlmProvider } from '../interfaces/llm-provider.interface';
import { LlmProviderConfig } from '../interfaces/llm-provider-config.interface';

export const llmProviders: Record<LlmProvider, LlmProviderConfig> = {
  deepseek: {
    baseURL: DEEPSEEK_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    token: DEEPSEEK_API_KEY,
  },
  gemini: {
    baseURL: GEMINI_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    token: GEMINI_API_KEY,
  },
};
