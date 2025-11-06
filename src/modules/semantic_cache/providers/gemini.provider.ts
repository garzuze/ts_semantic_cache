import { GoogleGenAI } from '@google/genai';
import { IEmbeddingRepository } from '../interfaces/embedding.repository.interface';

export class GeminiProvider implements IEmbeddingRepository {
  private readonly ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });
  
  async getEmbedding(prompt: string): Promise<number[]> {
    const response = await this.ai.models.embedContent({
      model: 'gemini-embedding-001',
      contents: prompt,
      config: {
        taskType: 'SEMANTIC_SIMILARITY',
        outputDimensionality: 1536,
      },
    });
    const embedding = response.embeddings.map((e) => e.values).flat();
    return embedding;
  }
}
