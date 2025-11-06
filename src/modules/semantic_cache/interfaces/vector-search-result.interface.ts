export interface ParsedDocument {
  id: string;
  prompt: string;
  answer: string;
}

export interface VectorSearchResult {
  total: number;
  docs: ParsedDocument[];
}
