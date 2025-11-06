import { FtRawSearchResult } from '../../interfaces/ft-raw-search-result.interface';
import { VectorSearchResult } from '../../interfaces/vector-search-result.interface';

// Transform RedisSearch response in a javascript object
// From: [total, id1, [field, val, ...], id2, [..], ...]
// To:VectorSearchResult

export function parseVectorSearch(
  reply: FtRawSearchResult,
): VectorSearchResult {
  const total = reply[0];
  const docs = [];
  for (let i = 1; i < reply.length; i += 2) {
    const id = reply[i];
    const fields = reply[i + 1] as string[];
    const doc = { id };
    for (let j = 0; j < fields.length; j += 2) {
      const k = fields[j];
      const v = fields[j + 1];
      doc[k] = v;
    }
    docs.push(doc);
  }
  return { total, docs };
}
