interface DeepSeekMessages {
  role: string;
  content: string;
}

export interface DeepSeekRequestBody {
  model: string;
  messages: DeepSeekMessages[];
}
