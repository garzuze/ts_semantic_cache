export interface LlmProviderConfig {
  baseURL: string;
  token: string;
  headers: Record<string, string>;
}
