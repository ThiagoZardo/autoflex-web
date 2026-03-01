# AutoFlex Web

Frontend da aplicação **AutoFlex**, desenvolvido com **Next.js (App Router)**, **TypeScript** e **Redux Toolkit**, utilizando arquitetura modular por domínio.

---

## 🚀 Tecnologias Utilizadas

- Next.js 13+
- React
- TypeScript
- Redux Toolkit
- TailwindCSS
- Arquitetura modular (Domain-Driven Structure)

---

## 📦 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone <repo-url>
cd autoflex-web
```

### 2️⃣ Instalar dependências

```bash
npm install
```

---

## ⚙️ Configuração de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 🔹 Portas do projeto

| Serviço     | Porta |
|------------|--------|
| Frontend   | 8080   |
| Backend    | 3000   |

O frontend roda na porta **8080** e consome a API do backend na **3000**.

---

## ▶️ Executar o Projeto

```bash
npm run dev
```

Acesse no navegador:

```
http://localhost:8080
```

---

## 🏗 Estrutura do Projeto

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
 ├── config/                  # Configurações (env, etc)
 └── services/                # Serviços globais (se necessário)
```

---

## 🧠 Arquitetura

O projeto segue uma abordagem **Domain-Driven**, onde cada domínio contém:

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

## 🌍 Rotas Disponíveis

- `/products`
- `/raw-materials`
- `/associations`
- `/manufacturing-plan`

A rota `/` redireciona automaticamente para `/products`.

---

## 🔄 Fluxo da Aplicação

```
Browser (8080)
        ↓
Next.js Frontend
        ↓
Backend API (3000)
```

---

## 🧪 Scripts Disponíveis

```bash
npm run dev     # Desenvolvimento (porta 8080)
npm run build   # Build de produção
npm run start   # Executa build
npm run lint    # Lint
```

---

## ⚠️ Observações Importantes

- Sempre reinicie o servidor após alterar o `.env`
- Variáveis expostas ao frontend devem começar com `NEXT_PUBLIC_`
- O backend deve estar rodando antes de iniciar o frontend
- Projeto preparado para expansão modular por domínio

---

## 📌 Requisitos

- Node.js 18+
- Backend AutoFlex rodando na porta 3000

---

## 👨‍💻 AutoFlex

Projeto desenvolvido para controle de produtos, matérias-primas, associações e planejamento de produção.