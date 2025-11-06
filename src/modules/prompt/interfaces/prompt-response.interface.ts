export interface PromptResponse {
  id?: string
  source: 'cache' | 'llm',
  score?: number
  prompt: string,
  answer: string,
}