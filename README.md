# The Blog

## 1. Visão Geral

**Nome do projeto:** `blog` (versão `0.1.0`, conforme `package.json`)

**The Blog** é uma aplicação web de blog construída com Next.js. A área pública exibe posts publicados em Markdown — com destaque para o post mais recente e listagem completa — enquanto a área administrativa (`/admin`) permite autenticação, criação, edição, exclusão e publicação de posts com upload de imagens de capa.

**Motivação:** centralizar publicação e leitura de conteúdo editorial em uma stack moderna de React/Next.js, com persistência em PostgreSQL (Neon), cache de leitura e painel administrativo protegido por sessão JWT.

**Status do projeto:** em desenvolvimento.

---

## 2. Tecnologias Utilizadas

### Frontend

| Tecnologia | Versão |
|---|---|
| Next.js | 16.1.6 |
| React | 19.2.3 |
| React DOM | 19.2.3 |
| Tailwind CSS | ^4 |
| @tailwindcss/postcss | ^4 |
| @tailwindcss/typography | ^0.5.19 |
| Lucide React | ^0.577.0 |
| @uiw/react-md-editor | ^4.0.11 |
| react-markdown | ^10.1.0 |
| remark-gfm | ^4.0.1 |
| rehype-sanitize | ^6.0.0 |
| react-toastify | ^11.0.5 |
| focus-trap-react | ^12.0.0 |
| clsx | ^2.1.1 |
| date-fns | ^4.1.0 |

### Backend (Server Actions, API interna e autenticação)

| Tecnologia | Versão |
|---|---|
| jose (JWT) | ^6.2.2 |
| bcryptjs | ^3.0.3 |
| zod | ^4.3.6 |
| sanitize-html | ^2.17.2 |
| slugify | ^1.6.9 |
| uuid | ^13.0.0 |
| dotenv | ^17.4.2 |

### Banco de dados

| Tecnologia | Versão |
|---|---|
| Drizzle ORM | ^0.45.1 |
| drizzle-kit | ^0.31.9 |
| @neondatabase/serverless | ^1.1.0 |
| PostgreSQL (Neon) | — |

> **Nota:** `better-sqlite3` (^12.6.2) permanece nas dependências e as migrações antigas referenciam SQLite, mas o código em execução usa PostgreSQL via Neon (`src/db/drizzle/index.ts`, `drizzle.config.ts`).

### Armazenamento de mídia

| Tecnologia | Versão |
|---|---|
| Cloudinary | ^2.9.0 |
| sharp | ^0.34.5 |
| file-type | ^21.3.4 |

### DevOps e ferramentas

| Tecnologia | Versão |
|---|---|
| TypeScript | ^5 |
| ESLint | ^9 |
| eslint-config-next | 16.1.6 |
| tsx | ^4.21.0 |
| babel-plugin-react-compiler | 1.0.0 |

### Testes

Nenhum framework de testes configurado no projeto (sem Jest, Vitest, Playwright ou arquivos `*.test.*` / `*.spec.*`).

---

## 3. Estrutura de Diretórios

```
blog-next-react/
├── drizzle.config.ts          # Configuração do Drizzle Kit (PostgreSQL / Neon)
├── eslint.config.mjs          # Regras ESLint (Next.js core-web-vitals + TypeScript)
├── middleware.ts              # Proteção das rotas /admin/* via JWT em cookie
├── next.config.ts             # Config Next.js (cache de componentes, domínios de imagem)
├── postcss.config.mjs         # Plugin PostCSS do Tailwind CSS v4
├── package.json               # Scripts, dependências e metadados do projeto
├── tsconfig.json              # TypeScript strict + alias @/* → src/*
├── .env.local-EXAMPPLE        # Modelo de variáveis de ambiente (referência no repositório)
│
└── src/
    ├── app/                   # App Router do Next.js (páginas, layouts, Server Actions)
    │   ├── layout.tsx         # Layout raiz: Header, Footer, Container, Toastify
    │   ├── page.tsx           # Home pública: post em destaque + listagem
    │   ├── globals.css        # Estilos globais (Tailwind v4 + typography)
    │   ├── error.tsx          # Boundary de erro global
    │   ├── not-found.tsx      # Página 404
    │   ├── post/[slug]/       # Página de leitura de um post publicado
    │   ├── admin/
    │   │   ├── login/         # Formulário de login administrativo
    │   │   └── post/          # CRUD de posts (listagem, novo, edição)
    │   └── actions/           # Server Actions (login, CRUD, upload)
    │       ├── create-post-action.ts
    │       ├── update-post-action.ts
    │       ├── delete-post-action.ts
    │       ├── login/
    │       └── upload/
    │
    ├── components/            # Componentes React reutilizáveis
    │   ├── admin/             # Formulários, editor Markdown, upload, menu admin
    │   ├── post/              # Cards, listagens, post individual, imagens
    │   ├── layout/            # Header e Footer
    │   ├── form/              # Ações de formulário e bridge de pending state
    │   ├── feedBack/          # Loader, mensagens de erro, toasts
    │   ├── ui/                # Botões, inputs, modal, container
    │   └── SafeMarkDown/      # Renderização segura de Markdown (sanitize + GFM)
    │
    ├── db/drizzle/            # Camada de persistência
    │   ├── index.ts           # Cliente Drizzle + driver Neon HTTP
    │   ├── schemas.ts         # Schema da tabela `posts`
    │   └── migrations/        # Migrações SQL geradas pelo Drizzle Kit
    │
    ├── repositories/post/     # Padrão Repository (interface + implementação Drizzle)
    ├── lib/
    │   ├── login/             # Hash de senha, JWT, sessão em cookie
    │   ├── post/queries/      # Queries cacheadas (público e admin) + validações Zod
    │   └── cloudinary.ts      # Configuração do SDK Cloudinary
    │
    ├── models/post/           # Tipos de domínio (PostModel)
    ├── dto/post/              # DTOs para formulários e respostas
    ├── adapters/              # Adaptadores de UI (ex.: toast messages)
    └── utils/                 # Helpers (slug, hash, formatação de data, Zod errors)
```

---

## 4. Pré-requisitos e Instalação

### Pré-requisitos

| Requisito | Versão mínima |
|---|---|
| Node.js | 20.x (compatível com `@types/node` ^20 e Next.js 16) |
| npm | 10.x ou superior |
| Conta Neon | PostgreSQL serverless (connection string) |
| Conta Cloudinary | Upload de imagens de capa |

### Desenvolvimento

```bash
# Clonar o repositório
git clone <URL_DO_REPOSITORIO>
cd blog-next-react

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local-EXAMPPLE .env.local
# Edite .env.local com credenciais reais (ver seção 5)

# Gerar hash de senha (opcional, para LOGIN_PASS)
npx tsx src/utils/generate-password-hash.ts

# Aplicar migrações no banco Neon
npm run migrate

# Iniciar servidor de desenvolvimento (http://localhost:3000)
npm run dev
```

### Produção

```bash
# Instalar dependências
npm install

# Configurar .env.local (ou variáveis no provedor de deploy)

# Aplicar migrações
npm run migrate

# Build otimizado
npm run build

# Servir aplicação compilada
npm run start
```

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento Next.js |
| `npm run build` | Build de produção |
| `npm run start` | Executa o build em modo produção |
| `npm run lint` | ESLint via `next lint` |
| `npm run migrate` | Aplica migrações Drizzle (`drizzle-kit migrate`) |
| `npm run seed` | Referencia `src/db/drizzle/seed.ts` — **arquivo ausente no repositório** |

---

## 5. Variáveis de Ambiente

Copie `.env.local-EXAMPPLE` para `.env.local` na raiz do projeto. O Next.js carrega automaticamente `.env.local`.

### Variáveis utilizadas pelo código

| Variável | Obrigatória | Descrição |
|---|---|---|
| `DATABASE_URL` | Sim | Connection string PostgreSQL do Neon |
| `JWT_SECRET_KEY` | Sim | Chave secreta para assinar tokens JWT (`jose`) |
| `LOGIN_USER` | Sim | Nome de usuário permitido no login admin |
| `LOGIN_PASS` | Sim | Hash bcrypt da senha em Base64 (gerado por `generate-password-hash.ts`) |
| `CLOUDINARY_CLOUD_NAME` | Sim* | Cloud name do Cloudinary (*obrigatório para upload de capa) |
| `CLOUDINARY_API_KEY` | Sim* | API key do Cloudinary |
| `CLOUDINARY_API_SECRET` | Sim* | API secret do Cloudinary |
| `LOGIN_COOKIE_NAME` | Não | Nome do cookie de sessão (padrão: `loginSession`) |
| `LOGIN_SESSION_NAME` | Não | Nome do cookie lido pelo `middleware.ts` (padrão: `loginSession`) |
| `LOGIN_EXPIRATION_SECONDS` | Não | TTL da sessão em segundos (padrão: `86400`) |
| `LOGIN_EXPIRATION_STRING` | Não | TTL no formato aceito pelo `jose` (padrão: `1d`) |
| `ALLOW_LOGIN` | Não | Habilita login (`1`) ou bloqueia (`0`; padrão: `1`) |
| `NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE` | Não | Tamanho máximo de upload em bytes (padrão: `921600` ≈ 900 KB) |

> **Atenção:** defina `LOGIN_COOKIE_NAME` e `LOGIN_SESSION_NAME` com o **mesmo valor** para que o middleware e as Server Actions compartilhem a mesma sessão.

### Variáveis presentes no exemplo, mas não referenciadas no código

| Variável | Status |
|---|---|
| `SIMULATE_WAIT_IN_MS` | Não utilizada |
| `IMAGE_UPLOAD_DIRECTORY` | Não utilizada (upload via Cloudinary) |
| `IMAGE_SERVER_URL` | Não utilizada |

### Exemplo de `.env.example`

```bash
# Banco de dados (Neon PostgreSQL)
DATABASE_URL=postgresql://usuario:senha@host/neondb?sslmode=require

# Autenticação JWT
JWT_SECRET_KEY=sua_chave_secreta_aqui
LOGIN_USER=admin
LOGIN_PASS=hash_bcrypt_em_base64_aqui
LOGIN_COOKIE_NAME=loginSession
LOGIN_SESSION_NAME=loginSession
LOGIN_EXPIRATION_SECONDS=86400
LOGIN_EXPIRATION_STRING=1d
ALLOW_LOGIN=1

# Upload de imagens (Cloudinary)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE=921600
```

Para gerar `LOGIN_PASS`:

```bash
# Edite src/utils/generate-password-hash.ts com a senha desejada, depois:
npx tsx src/utils/generate-password-hash.ts
```

---

## 6. Arquitetura e Decisões Técnicas

### Padrão arquitetural

Monolito **Next.js App Router** com separação em camadas:

```
Páginas/Componentes (UI)
        ↓
Server Actions + Middleware (aplicação / segurança)
        ↓
lib/post/queries (casos de uso + cache)
        ↓
Repository (PostRepository → DrizzlePostRepository)
        ↓
Drizzle ORM + Neon PostgreSQL
```

Não há microserviços: autenticação, CRUD, upload e renderização coexistem na mesma aplicação Next.js.

### Decisões principais

| Decisão | Motivo |
|---|---|
| **App Router + Server Actions** | Mutações (login, CRUD, upload) no servidor sem API REST separada; formulários com `useActionState` |
| **Repository Pattern** | `PostRepository` desacopla queries Drizzle da lógica de aplicação; facilita substituição do adapter de dados |
| **Neon + Drizzle (HTTP driver)** | PostgreSQL serverless adequado a deploys edge/serverless; ORM tipado com migrações versionadas |
| **JWT em cookie httpOnly** | Sessão admin stateless; `middleware.ts` protege `/admin/*` antes da renderização |
| **Credenciais via env vars** | Usuário/senha admin não ficam em banco; senha armazenada como hash bcrypt em Base64 |
| **`"use cache"` + `cacheTag`** | Leitura pública e admin cacheada; `revalidateTag` após create/update/delete |
| **Cloudinary + sharp** | Redimensionamento local (800px, PNG) antes do upload; domínio permitido em `next.config.ts` |
| **Markdown sanitizado** | `react-markdown` + `rehype-sanitize` na leitura; `sanitize-html` na validação Zod do conteúdo |
| **Tailwind CSS v4 + dark mode** | Estilização utilitária; layout raiz com `className="dark"` |
| **React Compiler (devDependency)** | Plugin disponível para otimização de componentes React |

### Fluxo de autenticação

```mermaid
sequenceDiagram
    participant U as Usuário
    participant M as middleware.ts
    participant A as loginAction
    participant C as Cookie JWT

    U->>A: POST /admin/login
    A->>A: Valida LOGIN_USER + LOGIN_PASS
    A->>C: Define cookie httpOnly
    U->>M: GET /admin/post
    M->>M: verifyJwt(cookie)
    M-->>U: next() ou redirect /admin/login
```

### Comunicação entre partes

| Origem | Destino | Mecanismo |
|---|---|---|
| Browser → Admin | Server Actions | FormData via POST interno Next.js |
| Server Actions → DB | DrizzlePostRepository | SQL via `@neondatabase/serverless` |
| Server Actions → Imagens | Cloudinary SDK | Stream upload após processamento com sharp |
| Middleware → Auth | `verifyJwt` (jose) | Leitura de cookie na edge |

---

## 7. Testes

### Estratégia atual

O projeto **não possui suite de testes configurada**. Não há:

- Framework de testes (Jest, Vitest, etc.)
- Testes end-to-end (Playwright, Cypress)
- Diretório `__tests__`, `tests/` ou arquivos `*.test.ts` / `*.spec.ts`
- Script `test` em `package.json`
- Relatório de cobertura

### Verificação manual recomendada

```bash
# Lint estático
npm run lint

# Fluxo completo local
npm run dev
# Acessar http://localhost:3000 (área pública)
# Acessar http://localhost:3000/admin/login (área admin)
```

---

## Rotas principais

| Rota | Acesso | Descrição |
|---|---|---|
| `/` | Público | Home com post em destaque e listagem |
| `/post/[slug]` | Público | Leitura de post publicado |
| `/admin/login` | Público | Login administrativo |
| `/admin/post` | Autenticado | Listagem de todos os posts |
| `/admin/post/new` | Autenticado | Criação de post |
| `/admin/post/[id]` | Autenticado | Edição de post |
