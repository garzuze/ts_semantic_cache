export interface IEmbeddingRepository {
  getEmbedding(prompt: string): Promise<number[]>;
}
