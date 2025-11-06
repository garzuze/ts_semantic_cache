import { PromptResponse } from "./prompt-response.interface";

export interface IPromptService {
  sendPrompt(prompt: string): Promise<PromptResponse>;
  generateAnswer(body: unknown): Promise<string>;
}