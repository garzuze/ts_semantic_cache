export interface Document {
  id: string;
  prompt: string;
  answer: string;
  embedding: Float32Array | Buffer<ArrayBufferLike>;
}

export interface RedisDocument {
  key: string;
  prompt: string;
  answer: string;
  embeddingBuffer: Buffer<ArrayBufferLike>;
}
