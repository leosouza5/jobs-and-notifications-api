# Jobs and Notifications API

Projeto de estudo para praticar filas de processamento assíncrono com BullMQ e envio de e-mails transacionais com Nodemailer, incluindo auditoria completa de jobs.

## Objetivo
- Enfileirar envio de e-mails via BullMQ (Redis)
- Processar jobs em workers separados
- Auditar cada job (status, tentativas, execuções)
- Servir como base para aprendizado e testes

## Stack
- Node.js + TypeScript
- Express
- Prisma + PostgreSQL
- BullMQ + Redis
- Nodemailer
- Zod (validação)
- Docker + Docker Compose

## Como rodar (Docker Compose)
1) Clone o repositório
```bash
git clone https://github.com/leosouza5/jobs-and-notifications-api.git
cd jobs-and-notifications-api
```
2) Configure o `.env`
```env
PORT=6000

# PostgreSQL
DATABASE_URL="postgresql://user:pass@db:5432/jobs_api?schema=public"
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=jobs_api
POSTGRES_PORT=5432

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redispass

# E-mail (SMTP)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=seu_usuario
MAIL_PASS=sua_senha
MAIL_FROM=noreply@example.com
```
3) Suba os containers
```bash
docker compose up --build
```

Isso sobe a API, o PostgreSQL e o Redis. As migrations rodam automaticamente.

Base URL padrão: `http://localhost:6000`

## Como rodar (ambiente local)
1) Instale dependências
```bash
npm install
```
2) Configure o `.env` (apontando para PostgreSQL e Redis locais)
3) Rode as migrations
```bash
npx prisma migrate dev
```
4) Inicie o servidor e o worker em terminais separados
```bash
npm run dev
```
```bash
npm run worker:emails
```

## Arquitetura

```
Request HTTP → Controller → UseCase (enfileira job) → BullMQ (Redis)
                                                          ↓
                                              Worker processa o job
                                                          ↓
                                              Envia e-mail (Nodemailer)
                                                          ↓
                                              Auditoria salva no banco (Prisma)
```

- **JobAudit** — registro principal do job (status, tentativas, payload)
- **JobExecution** — cada tentativa de execução do job (início, fim, erro)

## Coleção do Postman
Importe o arquivo `jobs-and-notifications-api.postman_collection.json`.

Variáveis usadas:
- `baseUrl` (ex: `http://localhost:6000`)
- `jobId` (UUID de um JobAudit)

## Rotas

### Health
- `GET /health` (pública)
  - Resposta: `{ "status": "ok" }`

### Emails
- `POST /emails/welcomeEmail`
  - Body:
```json
{ "email": "user@example.com", "name": "Leonardo" }
```
- `POST /emails/resetPasswordEmail`
  - Body:
```json
{ "email": "user@example.com", "name": "Leonardo", "code": "123456" }
```
- `POST /emails/accountLockedEmail`
  - Body:
```json
{ "email": "user@example.com", "name": "Leonardo" }
```
- `POST /emails/dailySummaryReportEmail`
  - Body:
```json
{
  "email": "user@example.com",
  "name": "Leonardo",
  "date": "2026-02-12",
  "tasksCompleted": 8,
  "tasksPending": 2
}
```

### Jobs
- `GET /jobs` — lista todos os jobs auditados
- `GET /jobs/:jobId` — detalhes de um job + histórico de execuções

## Observações
- Este repositório é **exclusivamente para aprendizado**.
- Para testar e-mails localmente, use serviços como [Mailtrap](https://mailtrap.io) ou [Ethereal](https://ethereal.email).
- Endpoints e regras podem mudar sem aviso.
