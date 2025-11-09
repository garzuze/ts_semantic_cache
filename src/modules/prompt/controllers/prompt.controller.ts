import type { Request, Response } from 'express';
import { createPromptService } from '../factories/prompt-service.factory';
import { PromptResponse } from '../interfaces/prompt-response.interface';

const promptService = createPromptService('gemini');

export const createPrompt = async (
  req: Request,
  res: Response<PromptResponse>,
): Promise<Response<PromptResponse>> => {
  const questionData = req.body;
  const answer = await promptService.sendPrompt(questionData.prompt);
  return res.json(answer);
};
