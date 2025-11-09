# TypeScript Semantic Cache

A modular Node.js + Express API that implements **semantic caching** for efficient LLM workflows.

This project provides:

- A **prompt module** to handle requests to LLM providers (e.g., OpenAI, DeepSeek, Gemini)
- A **semantic cache module** to reduce token costs and latency by caching LLM responses based on **semantic similarity** rather than exact string match

**Base use case:** before calling an expensive LLM API, check if a semantically similar question was already answered. If so, instantly return the cached response from Redis.

## Project Structure

```
.src/
│   server.ts
│
├───modules
│   ├───prompt
│   │   ├───controllers
│   │   │       prompt.controller.ts
│   │   ├───dtos
│   │   │       prompt.dto.ts
│   │   ├───interfaces
│   │   │   ├───abstract
│   │   │   │       base-prompt-service.ts
│   │   │   ├───prompt-response.interface.ts
│   │   │   ├───prompt.service.interface.ts
│   │   │   └───request-body.interface.ts
│   │   ├───routes
│   │   │       prompt.routes.ts
│   │   └───services
│   │           deepseek-prompt.service.ts
│   │
│   └───semantic_cache
│       ├───config
│       │       cache.config.ts
│       ├───interfaces
│       │       cache.config.interface.ts
│       │       document.interface.ts
│       │       embedding.repository.interface.ts
│       │       ft-raw-search-result.interface.ts
│       │       vector-search-result.interface.ts
│       ├───providers
│       │       gemini.provider.ts
│       │       openai.provider.ts
│       ├───services
│       │   ├───core
│       │   │       embedding.service.ts
│       │   │       semantic-cache.service.ts
│       │   ├───search
│       │   │       cached-answer.service.ts
│       │   │       parse-vector-search.service.ts
│       │   │       vector-search.service.ts
│       │   └───storage
│       │           document-storage.service.ts
│       │           index-management.service.ts
│       └───utils
│               buffer-to-float32.ts
│               cosine-similarity.ts
│               float32-to-buffer.ts
│
└───shared
    ├───exceptions
    ├───middlewares
    ├───services
    └───utils
```

### Semantic Caching

Instead of caching by exact string match, semantic caching uses **vector embeddings** to find semantically similar queries.
When a user sends a question:

- We convert each user question into an embedding, a sort of mathematical representation of meaning (basically a very big float vector);
- We store the embedding + original question + LLM response in a Redis vector database;
- When a new query comes in, we perform a vector search in Redis to retrieve the 5 most semantically similar questions
- We then calculate how close these questions are to the current question, by using a cosine similarity algorithm, which returns a number from 0 to 1.
- If the similarity exceeds our threshold (0.82), we return the cached response, skipping the LLM call entirely

This way we reduce token usage and improve user experience by providing answers waaaay faster!

### Prompt Module

Provides a consistent entry point to send queries to different LLM APIs.
It handles:

- Input validation with `class-validator`
- Request formatting
- Response normalization

## Stack

- TypeScript                        
- Node.js + Express                           
- Redis with RediSearch             
- OpenAI / Gemini APIs              
- class-validator, class-transformer
- Axios                             

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/garzuze/ts_semantic_cache.git
cd ts_semantic_cache
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Run docker

```bash
docker compose up -d
```

Server will run on `http://localhost:3000`.

## TODO

- [ ] Create OpenAI prompt service
- [ ] Create Claude prompt service
- [X] Add factory pattern 
