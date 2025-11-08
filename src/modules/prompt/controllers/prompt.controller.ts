import type { Request, Response } from 'express';
import { SemanticCacheService } from '../../semantic_cache/services/core/semantic-cache.service';
import { createApi } from '../factories/api.factory';
import { PromptResponse } from '../interfaces/prompt-response.interface';
import { GeminiPromptService } from '../services/gemini-prompt.service';

const semanticCache = new SemanticCacheService();
const api = createApi('gemini');
const promptService = new GeminiPromptService(api, semanticCache);

export const createPrompt = async (
  req: Request,
  res: Response<PromptResponse>,
): Promise<Response<PromptResponse>> => {
  const questionData = req.body;
  const answer = await promptService.sendPrompt(questionData.prompt);
  return res.json(answer);
};
