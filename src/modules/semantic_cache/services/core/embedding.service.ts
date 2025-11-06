import { IEmbeddingRepository } from '../../interfaces/embedding.repository.interface';

export class EmbeddingService {
  constructor(private readonly repository: IEmbeddingRepository) {}

  async get(prompt: string) {
    const embedding = await this.repository.getEmbedding(prompt);
    return new Float32Array(embedding);
  }
}
