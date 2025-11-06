export interface CacheConfig {
  redis: {
    index: string;
    prefix: string;
    expiration: number;
    url: string;
  };
  vector: {
    field: string;
    dimmensions: number;
    knnResults: number;
    similarityThreshold: number;
    indexType: string;
    distanceMetric: string;
  };
}
