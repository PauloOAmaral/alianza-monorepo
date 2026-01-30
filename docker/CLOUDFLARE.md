# Cloudflare Services Development Guide

Este guia explica como trabalhar com os serviços da Cloudflare em desenvolvimento local.

## Visão Geral

O projeto usa os seguintes serviços da Cloudflare:

| Serviço | Descrição | Local Alternative | Requer API Real |
|---------|-----------|-------------------|-----------------|
| **R2** | Object storage (S3-compatible) | MinIO (Docker) | ❌ Não |
| **KV** | Key-value storage | Redis (Docker) | ❌ Não |
| **D1** | SQLite database | PostgreSQL (Docker) | ❌ Não |
| **Stream** | Video processing/streaming | N/A | ✅ Sim |
| **Turnstile** | Captcha/bot protection | N/A | ✅ Sim |
| **Browser Rendering** | Headless browser | N/A | ✅ Sim |

## Estratégias de Desenvolvimento

### Opção 1: Wrangler Dev (Recomendado)

Use `wrangler dev` para emulação local completa dos serviços Cloudflare:

```bash
cd apps/admin-web
npm run dev
```

**Vantagens:**
- Emula KV, R2, D1 localmente
- Persistência entre sessões
- Mais próximo do ambiente de produção
- Hot reload automático

**Limitações:**
- Stream, Turnstile e Browser Rendering ainda precisam de APIs reais
- Requer configuração de bindings no `wrangler.jsonc`

### Opção 2: Docker + Cloudflare Híbrido

Use serviços Docker para alternativas open-source:

```bash
# Iniciar serviços locais
bun docker:up

# Rodar app
cd apps/admin-web
npm run dev
```

**Vantagens:**
- Mais controle sobre os serviços
- Interfaces web para debugging (MinIO Console, RedisInsight)
- Não depende do Wrangler

**Limitações:**
- Precisa adaptar código para usar Redis/MinIO em vez de KV/R2
- Diferenças de comportamento entre Docker e Cloudflare

## Configuração de Bindings

### wrangler.jsonc

Adicione bindings ao seu `wrangler.jsonc`:

```jsonc
{
  "name": "admin-web",
  "compatibility_date": "2025-04-04",

  // KV Namespaces
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "dev-kv-namespace-id",
      "preview_id": "preview-kv-namespace-id"
    }
  ],

  // R2 Buckets
  "r2_buckets": [
    {
      "binding": "R2",
      "bucket_name": "alianza-bucket",
      "preview_bucket_name": "alianza-bucket-preview"
    }
  ],

  // D1 Databases
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "alianza-db",
      "database_id": "dev-database-id"
    }
  ],

  // Environment Variables
  "vars": {
    "CLOUDFLARE_ACCOUNT_ID": "your-account-id",
    "CLOUDFLARE_STREAM_CUSTOMER_ID": "your-customer-id"
  }
}
```

### Usando Bindings no Código

```typescript
// loader.ts
export async function loader({ context }: Route.LoaderArgs) {
  // Acesso ao KV
  const value = await context.cloudflare.env.KV.get("key")

  // Acesso ao R2
  const file = await context.cloudflare.env.R2.get("path/to/file")

  // Acesso ao D1
  const result = await context.cloudflare.env.DB
    .prepare("SELECT * FROM users WHERE id = ?")
    .bind(userId)
    .first()

  return { value, file, result }
}
```

## Serviços que Requerem APIs Reais

### Cloudflare Stream

Para desenvolvimento com vídeos, você precisa:

1. Criar conta no Cloudflare
2. Ativar o Stream
3. Obter credenciais:

```env
CLOUDFLARE_ACCOUNT_ID=your-account-id
CLOUDFLARE_ACCOUNT_TOKEN=your-token
CLOUDFLARE_STREAM_CUSTOMER_ID=your-customer-id
CLOUDFLARE_STREAM_ID=your-stream-id
CLOUDFLARE_STREAM_PRIVATE_KEY=your-base64-jwk
```

**Custo:** Pay-as-you-go (minutos de vídeo armazenados/entregues)

### Cloudflare Turnstile

Captcha gratuito da Cloudflare:

1. Criar site no Turnstile Dashboard
2. Obter Site Key e Secret Key:

```env
CLOUDFLARE_TURNSTILE_SECRET_KEY=your-secret-key
CLOUDFLARE_TURNSTILE_SITE_KEY=your-site-key
```

**Custo:** Gratuito (até 1M requests/mês)

### Browser Rendering

Para screenshots e PDFs:

```env
CLOUDFLARE_BROWSER_RENDERING_ENDPOINT=https://api.cloudflare.com/client/v4/accounts/{account_id}/browser
```

**Custo:** Pay-as-you-go

## Alternativas Docker Detalhadas

### Redis como KV

Redis implementa interface similar ao Cloudflare KV:

```typescript
// packages/services/src/kv/redis-kv.ts
import { createClient } from "redis"

export class RedisKV {
  private client: ReturnType<typeof createClient>

  async get(key: string): Promise<string | null> {
    return this.client.get(key)
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.setEx(key, ttl, value)
    } else {
      await this.client.set(key, value)
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key)
  }
}
```

**Conexão:**
```typescript
const redis = createClient({
  url: "redis://:alianza_dev@localhost:6379"
})
await redis.connect()
```

### MinIO como R2

MinIO é S3-compatible, igual ao R2:

```typescript
// packages/services/src/storage/minio-storage.ts
import { S3Client } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  endpoint: "http://localhost:9000",
  region: "us-east-1",
  credentials: {
    accessKeyId: "alianza",
    secretAccessKey: "alianza_dev",
  },
  forcePathStyle: true, // Necessário para MinIO
})
```

## Debugging

### Visualizar dados no Redis

```bash
# Conectar ao Redis
docker exec -it alianza-redis redis-cli -a alianza_dev

# Listar todas as chaves
KEYS *

# Ver valor de uma chave
GET session:123

# Ver TTL de uma chave
TTL session:123
```

### Visualizar arquivos no MinIO

Acesse o Console: http://localhost:9001
- User: alianza
- Password: alianza_dev

### Logs do Wrangler

```bash
# Rodar com logs detalhados
wrangler dev --log-level debug
```

## Testes

### Testar com Wrangler Local

```bash
# Rodar testes contra bindings locais
wrangler dev --test-scheduled
```

### Testar com Docker

```bash
# Rodar testes contra Redis/MinIO
npm run test:integration
```

## Deploy para Produção

### Criar Bindings Reais

```bash
# Criar KV namespace
wrangler kv:namespace create "KV"

# Criar R2 bucket
wrangler r2 bucket create alianza-bucket

# Criar D1 database
wrangler d1 create alianza-db
```

### Atualizar wrangler.jsonc

Substitua IDs de desenvolvimento pelos IDs de produção:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "KV",
      "id": "production-kv-id"  // ID real
    }
  ]
}
```

### Deploy

```bash
npm run deploy
```

## Custos Estimados (Desenvolvimento)

| Serviço | Free Tier | Custo Após Free Tier |
|---------|-----------|---------------------|
| **KV** | 100K reads/day | $0.50/1M reads |
| **R2** | 10 GB storage | $0.015/GB/month |
| **D1** | 5M rows read | $0.001/1M rows |
| **Stream** | N/A | $1/1000 min stored |
| **Turnstile** | 1M requests/month | Grátis |

**Recomendação:** Para desenvolvimento, use Docker (grátis) e só use APIs reais quando necessário.

## Troubleshooting

### "KV binding not found"

Verifique se o binding está configurado no `wrangler.jsonc` e se o namespace foi criado:

```bash
wrangler kv:namespace list
```

### "R2 bucket not found"

Crie o bucket:

```bash
wrangler r2 bucket create alianza-bucket
```

### Redis connection refused

Verifique se o container está rodando:

```bash
docker-compose ps redis
docker-compose logs redis
```

### MinIO access denied

Verifique credenciais e configure bucket policy:

```bash
mc alias set local http://localhost:9000 alianza alianza_dev
mc anonymous set download local/alianza-bucket
```

## Recursos

- [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
- [KV Storage](https://developers.cloudflare.com/kv/)
- [R2 Storage](https://developers.cloudflare.com/r2/)
- [Cloudflare Stream](https://developers.cloudflare.com/stream/)
- [Turnstile](https://developers.cloudflare.com/turnstile/)
