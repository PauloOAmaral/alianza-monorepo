# Development Services

Docker Compose configuration for all services needed for development.

## Services

### MySQL
- **Port**: 3306
- **User**: alianza
- **Password**: alianza_dev
- **Database**: alianza_db
- **Connection String**: `mysql://alianza:alianza_dev@localhost:3306/alianza_db`

### RabbitMQ
- **AMQP Port**: 5672
- **Management UI**: http://localhost:15672
- **User**: alianza
- **Password**: alianza_dev

### Mailhog
- **SMTP Port**: 1025
- **Web UI**: http://localhost:8025

Configure your app to send emails to `localhost:1025` and view them at the web UI.

### MinIO (S3-compatible storage / R2 alternative)
- **API Port**: 9000
- **Console UI**: http://localhost:9001
- **Access Key**: alianza
- **Secret Key**: alianza_dev
- **Default Bucket**: alianza-bucket
- **Use Case**: Alternative to Cloudflare R2 for local development

### Redis (KV storage / Cloudflare KV alternative)
- **Port**: 6379
- **Password**: alianza_dev
- **Use Case**: Alternative to Cloudflare KV for local development

## Usage

### Start all services
```bash
cd docker
docker-compose up -d
```

### Start specific service
```bash
docker-compose up -d mysql
```

### Stop all services
```bash
docker-compose down
```

### Stop and remove volumes (⚠️ deletes data)
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f mysql
```

### Check service status
```bash
docker-compose ps
```

## Initial Setup

All services include health checks and will be ready when:
```bash
docker-compose ps
```
Shows all services as "healthy".

The MinIO bucket `alianza-bucket` is created automatically on first run.

## Database Initialization

Place SQL scripts in `./init-scripts/` directory to run them automatically when MySQL starts for the first time.

Example:
```bash
echo "CREATE TABLE IF NOT EXISTS test (id INT PRIMARY KEY);" > init-scripts/01-init.sql
```

## Environment Variables

For your application, use these environment variables:

```env
# Database
DATABASE_URL=mysql://alianza:alianza_dev@localhost:3306/alianza_db

# RabbitMQ
RABBITMQ_URL=amqp://alianza:alianza_dev@localhost:5672

# Email (Mailhog)
SMTP_HOST=localhost
SMTP_PORT=1025

# MinIO (S3 / Cloudflare R2 alternative for local dev)
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=alianza
S3_SECRET_KEY=alianza_dev
S3_BUCKET=alianza-bucket
S3_REGION=us-east-1

# Redis (Cloudflare KV alternative for local dev)
REDIS_URL=redis://:alianza_dev@localhost:6379
```

## Cloudflare Services

### Local Development with Wrangler

For Cloudflare-specific services (KV, R2, D1, Stream, etc.), use `wrangler dev` which provides local emulation:

```bash
# Run admin-web with Cloudflare services emulated
cd apps/admin-web
npm run dev
```

Wrangler automatically provides:
- **KV Namespaces**: Local persistence between dev sessions
- **R2 Buckets**: Local file storage simulation
- **D1 Database**: Local SQLite database
- **Durable Objects**: Local state management

### Cloudflare Services Not Available Locally

These services require the real Cloudflare APIs even in development:

#### Cloudflare Stream (Video Processing)
```env
CLOUDFLARE_ACCOUNT_ID=xxxxx
CLOUDFLARE_ACCOUNT_TOKEN=xxxxx
CLOUDFLARE_STREAM_CUSTOMER_ID=xxxxx
CLOUDFLARE_STREAM_ID=xxxxx
CLOUDFLARE_STREAM_PRIVATE_KEY=base64-encoded-jwk
```

#### Cloudflare Turnstile (Captcha)
```env
CLOUDFLARE_TURNSTILE_SECRET_KEY=xxxxx
CLOUDFLARE_TURNSTILE_VERIFY_URL=https://challenges.cloudflare.com/turnstile/v0/siteverify
```

#### Cloudflare Browser Rendering
```env
CLOUDFLARE_BROWSER_RENDERING_ENDPOINT=https://api.cloudflare.com/client/v4/accounts/{account_id}/browser
```

### Hybrid Setup: Local + Cloudflare

You can use Docker services alongside Cloudflare:

```bash
# Start local services (DB, Redis, MinIO, etc.)
bun docker:up

# Run app with Cloudflare bindings
cd apps/admin-web
npm run dev
```

In this setup:
- ✅ PostgreSQL → Docker
- ✅ RabbitMQ → Docker
- ✅ Redis/KV → Docker (or Wrangler local)
- ✅ S3/R2 → MinIO in Docker (or Wrangler local)
- ⚠️ Stream → Real Cloudflare API
- ⚠️ Turnstile → Real Cloudflare API
- ⚠️ Browser Rendering → Real Cloudflare API

## Troubleshooting

### Ports already in use
If you get port conflict errors, you can change the ports in `docker-compose.yml`. For example, to change PostgreSQL to port 5433:
```yaml
ports:
  - "5433:5432"
```

### Reset a specific service
```bash
docker-compose stop postgres
docker volume rm docker_postgres_data
docker-compose up -d postgres
```

### View service resource usage
```bash
docker stats
```
