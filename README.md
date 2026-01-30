# Alianza Monorepo

Monorepo gerenciado com Turborepo contendo aplicações e pacotes compartilhados.

## Estrutura

### Apps

- `webapp`: aplicação [React Router](https://reactrouter.com/) com [Vite](https://vitejs.dev/)

### Packages

- `@alianza/ui`: biblioteca de componentes React compartilhada
- `@alianza/application`: lógica de aplicação
- `@alianza/database`: camada de banco de dados (Drizzle ORM + PostgreSQL)
- `@alianza/services`: serviços compartilhados
- `@alianza/utils`: utilitários
- `@alianza/jobs`: processamento de jobs
- `@alianza/notifications`: sistema de notificações
- `@alianza/tsconfig`: configurações TypeScript compartilhadas

## Tecnologias

- [Turborepo](https://turborepo.dev/) para gerenciamento do monorepo
- [Bun](https://bun.sh/) como package manager
- [TypeScript](https://www.typescriptlang.org/) para type checking
- [Biome](https://biomejs.dev/) para linting e formatação
- [React](https://react.dev/) 18/19
- [Next.js](https://nextjs.org/) 16
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

## Pré-requisitos

- Node.js >= 18
- Bun >= 1.2.11
- Docker e Docker Compose (para serviços locais)

## Configuração Inicial

### 1. Instalar Dependências

```sh
bun install
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo e configure as variáveis:

```sh
cp .env.example .env
```

As principais variáveis são:

- `DATABASE_URL`: URL de conexão do PostgreSQL
- `MAIN_DIRECT_DATABASE_URL`: URL direta do banco de dados
- `MAIN_POOL_DATABASE_URL`: URL com pool de conexões

### 3. Iniciar Serviços com Docker

O projeto usa Docker Compose para executar os serviços necessários:

```sh
cd docker
docker compose up -d
```

Serviços disponíveis:
- **PostgreSQL**: localhost:5432 (banco de dados principal)
- **RabbitMQ**: localhost:5672 (mensageria) | UI em localhost:15672
- **Mailhog**: localhost:1025 (SMTP) | UI em localhost:8025
- **MinIO**: localhost:9000 (S3-compatible) | Console em localhost:9001

### 4. Configurar Banco de Dados

Gerar e executar migrações:

```sh
cd packages/database

# Gerar migrações do Drizzle
bun run db:generate:admin

# Executar migrações
bun run db:migrate:admin

# (Opcional) Popular banco com dados iniciais
bun run db:seed:admin
```

Credenciais padrão do seed:
- Email: `admin@alianza.com`
- Senha: `alianza123`

### 5. Iniciar Aplicações

```sh
# Voltar para a raiz do projeto
cd ../..

# Iniciar todas as aplicações em desenvolvimento
bun dev
```

## Scripts

### Desenvolvimento

Executar todas as aplicações em modo desenvolvimento:

```sh
bun dev
```

Executar uma aplicação específica:

```sh
bun dev --filter=web
bun dev --filter=docs
bun dev --filter=webapp
```

### Build

Build de todos os apps e packages:

```sh
bun build
```

Build de um app específico:

```sh
bun build --filter=web
```

### Linting e Formatação

Verificar e corrigir problemas:

```sh
bun lint
```

Formatar código:

```sh
bun format
```

### Type Checking

Verificar tipos em todos os packages:

```sh
bun check-types
```

## Estrutura de Workspaces

O projeto utiliza workspaces do Bun para gerenciar dependências:

- `apps/*`: aplicações
- `packages/*`: pacotes compartilhados

## Links Úteis

- [Turborepo Docs](https://turborepo.dev/docs)
- [Bun Docs](https://bun.sh/docs)
- [Biome Docs](https://biomejs.dev/docs)
