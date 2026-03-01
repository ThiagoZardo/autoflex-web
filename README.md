# 🌐 AutoFlex Web

Frontend da aplicação **AutoFlex**, desenvolvido com **Next.js (App Router)**, **TypeScript** e **Redux Toolkit**, utilizando arquitetura modular por domínio.

---

## 🚀 Tecnologias Utilizadas

- Next.js 13+
- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Arquitetura modular (Domain-Driven Structure)
- Docker

---

# 🐳 Execução com Docker (Recomendado)

O projeto pode ser executado de forma isolada ou junto com o backend utilizando **Docker Compose**.

---

## ▶️ Subir aplicação com Docker

```bash
docker compose up --build
```

Isso irá:

- Buildar o frontend
- Subir o container na porta **8080**
- Conectar automaticamente ao backend

---

## 🌍 Acessar aplicação

```
http://localhost:8080
```

---

## 🔄 Resetar containers

```bash
docker compose down
docker compose up --build
```

---

# 🔗 Integração com Backend

O frontend consome a API do backend AutoFlex.

### 🔹 Portas padrão:

| Serviço  | Porta |
| -------- | ----- |
| Frontend | 8080  |
| Backend  | 3000  |

Fluxo:

```
Browser (8080)
        ↓
Next.js Frontend
        ↓
Backend API (3000)
```

---

# ⚙️ Configuração de Ambiente

Se estiver rodando **sem Docker**, crie um arquivo:

```
.env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### ⚠️ Importante

- Variáveis públicas devem começar com `NEXT_PUBLIC_`
- Após alterar `.env.local`, reinicie o servidor

---

# 🧪 Executando Localmente (Sem Docker)

## 1️⃣ Clonar repositório

```bash
git clone <repo-url>
cd autoflex-web
```

---

## 2️⃣ Instalar dependências

```bash
npm install
```

---

## 3️⃣ Executar em modo desenvolvimento

```bash
npm run dev
```

Acesse:

```
http://localhost:8080
```

⚠️ O backend precisa estar rodando antes.

---

# 🏗 Estrutura do Projeto

```
src/
 ├── app/                     # Rotas (Next.js App Router)
 │    ├── products
 │    ├── raw-materials
 │    ├── associations
 │    └── manufacturing-plan
 │
 ├── domains/                 # Estrutura modular por domínio
 │    ├── products
 │    ├── raw-materials
 │    ├── associations
 │    └── manufacturing-plan
 │
 ├── components/              # Componentes globais (Layout, Sidebar)
 ├── store/                   # Configuração global do Redux
 ├── config/                  # Configurações (env)
 └── services/                # Comunicação com API
```

---

# 🧠 Arquitetura

O projeto segue abordagem **Domain-Driven**, onde cada domínio contém:

```
domain/
 ├── components      # UI
 ├── hooks           # Hooks customizados
 ├── services        # Comunicação com API
 ├── store           # Slice Redux
 └── types           # Tipagens
```

Essa separação garante:

- Escalabilidade
- Organização
- Baixo acoplamento
- Facilidade de manutenção

---

# 🌍 Rotas Disponíveis

- `/products`
- `/raw-materials`
- `/associations`
- `/manufacturing-plan`

A rota `/` redireciona automaticamente para `/products`.

---

# 🧪 Scripts Disponíveis

```bash
npm run dev     # Desenvolvimento (porta 8080)
npm run build   # Build de produção
npm run start   # Executa build
npm run lint    # Lint
```

---

# 📦 Build para Produção

```bash
npm run build
npm run start
```

Ou via Docker:

```bash
docker compose up --build
```

---

# ⚠️ Observações Importantes

- O backend deve estar disponível na URL configurada
- Sempre reinicie o servidor após alterar variáveis de ambiente
- Projeto preparado para expansão modular por domínio
- Docker pronto para ambiente de produção

---

## 👨‍💻 AutoFlex

Interface web para controle de produtos, matérias-primas, associações e planejamento de produção.

Projeto desenvolvido com foco em arquitetura modular, escalabilidade e integração full-stack containerizada.
