import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../shared/utils/constants';
import { IEmbeddingRepository } from '../interfaces/embedding.repository.interface';

export class OpenAIProvider implements IEmbeddingRepository {
  private readonly openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  async getEmbedding(prompt: string): Promise<number[]> {
    const response = await this.openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: prompt,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  }
}
