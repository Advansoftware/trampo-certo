# TrampoCerto ⚡💼

> Gestor financeiro inteligente, emissor de orçamentos rápidos e termômetro fiscal para o MEI e autônomo brasileiro.

Desenvolvido com foco em alta conversão, responsividade mobile-first e conformidade estrita aos protótipos e design tokens do **Google Stitch (Material You M3)**.

---

## 🚀 Tecnologias

- **Frontend:**
  - Next.js 16 (App Router, Turbopack)
  - React 19
  - Material UI (MUI v9) com tema customizado e tokens de design oficiais
  - Tipografia: Plus Jakarta Sans & Inter
  - Autenticação de sessão com Better Auth (e-mail e senha)
  - Camadas separadas: `types/` (modelo de domínio), `lib/api/` (cliente HTTP por recurso),
    `hooks/` (carregamento e mutação) e `components/` (apresentação)
- **Backend:**
  - NestJS 11 em arquitetura de camadas: `controller` → `service` → `repository`
  - MySQL 8.4 com pool assíncrono e schema versionado em código
  - Better Auth com sessão em cookie e rotas de negócio protegidas por guard
  - Módulos: auth, users, clientes, orçamentos, recibos e MEI (métricas/DAS)
- **DevOps & Containers:**
  - Docker & Docker Compose
  - Hot-reload ativado para desenvolvimento full-stack sem rebuilds manuais

---

## 🖥️ Telas e Recursos Implementados

> **Sem dados fictícios.** Todo número exibido no app vem do MySQL: faturamento,
> termômetro do teto, DAS, agregados por cliente e relatório de receitas brutas são
> calculados a partir dos orçamentos e recibos reais do usuário logado. Uma conta nova
> começa zerada, com estados vazios em vez de valores de exemplo.

1. **Acesso Seguro MEI (Login Split-Screen):**
   - Header com logo oficial TrampoCerto e badge *Ambiente Seguro MEI*.
   - Autenticação facilitada com botão oficial Gov.br e Google.
   - Formulário com suporte a E-mail, CPF ou CNPJ.
   - Vitrine direita com *Termômetro Fiscal MEI* interativo, chips de benefícios e depoimento com prova social.
   - Selos de confiança: Criptografia bancária TLS 1.3, Integração com Simples Nacional e conformidade LGPD.

2. **Dashboard & Termômetro MEI:**
   - **Termômetro MEI:** Monitoramento visual em tempo real do teto anual de faturamento (R$ 81.000,00), percentual utilizado, saldo restante e projeção mensal segura.
   - **Guia DAS MEI:** Card de atenção com competência atual, valor oficial, vencimento e botão para copiar chave Pix ou emitir guia.
   - **Métricas do Mês:** Faturamento atual, orçamentos emitidos, valores pendentes e taxa de conversão.
   - **Propostas Recentes:** Tabela responsiva com status de aprovação, valores e ações rápidas no WhatsApp.
   - **Programa Parceiro:** Banner promocional com link exclusivo de indicação.

3. **Criador de Orçamentos:**
   - Formulário de cliente com preenchimento rápido (Nome, WhatsApp, Endereço, Validade).
   - Tabela de itens/serviços com adição/remoção dinâmica e recálculo automático de subtotais.
   - Condições comerciais: desconto, chave Pix, validade e termos de garantia.
   - Pré-visualização ao vivo em formato de proposta formal A4, já com os dados do emissor.
   - Códigos sequenciais por ano e usuário (`ORC-2026-001`), gerados no servidor.
   - Propostas aprovadas ou recusadas ficam somente leitura — no formulário e na API.

4. **Clientes, Recibos e Faturamento:**
   - Carteira de clientes com faturamento, propostas e último serviço calculados no SQL.
   - Recibos com código sequencial, valor por extenso e código de autenticação gerados no servidor.
   - Relatório Mensal de Receitas Brutas do ano corrente e baixa da guia DAS por competência.

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos
- Docker & Docker Compose instalados.
- Node.js 20+ (caso queira rodar os comandos fora do Docker).

### Execução com Docker (Recomendado)

1. Clone o repositório:
```bash
git clone git@github.com:Advansoftware/trampo-certo.git
cd trampo-certo
```

2. Copie o arquivo de variáveis de ambiente:
```bash
cp .env.example .env
```

3. Suba todos os serviços em segundo plano:
```bash
docker compose up -d --build
```

4. Acesse as aplicações:
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:4005](http://localhost:4005)
- **MySQL Database:** Porta `3308` (para evitar conflitos com instâncias locais do MySQL)

---

## 🔐 Autenticação

A autenticação é real: as rotas `/api/*` de negócio exigem sessão válida do Better Auth
(cookie enviado em toda chamada) e respondem `401` sem ela. O layout do painel redireciona
para `/login` quando não há sessão.

- **Criar conta:** `/cadastro` — nome, e-mail, senha (mínimo 8 caracteres) e os dados MEI
  que aparecem nos orçamentos e recibos (ocupação, CNPJ, telefone, cidade e chave Pix).
- **Conta inicial:** no primeiro boot, se `DEMO_USER_EMAIL` e `DEMO_USER_PASSWORD` estiverem
  definidos no `.env`, a API cria essa conta pelo próprio Better Auth (senha com hash real).
  Os valores padrão do `.env.example` são:

  | Campo | Valor |
  | --- | --- |
  | E-mail | `rodrigo@trampocerto.com.br` |
  | Senha | `trampocerto123` |

  Deixe as duas variáveis em branco para subir o ambiente sem nenhuma conta pré-criada.
- **Gov.br e Google:** os provedores sociais ainda não estão configurados; os botões avisam
  isso em vez de simular um login.

### Banco de dados

O schema vive em `backend/src/database/schema.ts` e é aplicado pelo `SchemaService` a cada
boot da API — idempotente, funciona tanto em banco novo quanto em banco já existente.
O `init.sql` cuida apenas da criação do banco e do charset `utf8mb4`.

---

## 📁 Estrutura de Diretórios

```
trampo-certo/
├── assets/                  # Protótipos de tela, logos e design system do Stitch
├── backend/                 # API NestJS com MySQL e Better Auth
│   ├── src/
│   │   ├── common/          # Guard de sessão, decorators e utilitários
│   │   ├── database/        # Pool MySQL, schema declarativo e sincronização
│   │   ├── auth/            # Better Auth + criação da conta inicial
│   │   ├── users/           # Perfil MEI do usuário logado
│   │   ├── clientes/        # Carteira de clientes e agregados
│   │   ├── orcamentos/      # Propostas, itens e regras de bloqueio
│   │   ├── recibos/         # Emissão de recibos e valor por extenso
│   │   └── mei/             # Métricas, receitas mensais e guia DAS
│   ├── init.sql             # Criação do banco e charset
│   └── Dockerfile.dev
├── frontend/                # Aplicação Next.js 16 com Material UI
│   ├── public/              # Imagens e assets estáticos
│   ├── src/
│   │   ├── app/             # Rotas do App Router (/login, /cadastro, painel)
│   │   ├── components/      # Componentes por domínio + comuns e providers
│   │   ├── hooks/           # Carregamento de dados, sessão e feedback
│   │   ├── lib/api/         # Cliente HTTP tipado, um módulo por recurso
│   │   ├── lib/format/      # Moeda, datas, CSV e texto
│   │   ├── types/           # Modelo de domínio compartilhado
│   │   └── theme/           # Design tokens e tema Material 3
│   └── Dockerfile.dev
├── docker-compose.yml       # Orquestração dos serviços para desenvolvimento
├── .env.example             # Modelo seguro de variáveis de ambiente
└── README.md
```


---

## 🚢 Deploy em produção (Coolify)

O repositório tem dois arquivos de Compose:

| Arquivo | Uso |
| --- | --- |
| `docker-compose.yml` | **Produção.** É o que o Coolify executa: imagens buildadas dos `Dockerfile` de cada app, nenhuma porta publicada no host, `restart: unless-stopped` e healthchecks. |
| `docker-compose.override.yml` | **Desenvolvimento.** Mesclado automaticamente pelo `docker compose up` local: devolve portas, hot-reload e nomes fixos de container. O Coolify ignora este arquivo. |

### Como o tráfego funciona

Publique **um único domínio**, apontado para o serviço `web`. O Next encaminha
`/api/*` para a API pela rede interna do Compose, então app e API ficam na mesma
origem — sem CORS e sem cookie entre domínios, que é onde a maioria dos deploys
quebra. A API não precisa de domínio público.

```
navegador → https://app.seudominio.com ─┬─ páginas  → web (Next, porta 3000)
                                        └─ /api/*   → api (NestJS, porta 4000)
                                                      api → db (MySQL 8.4)
```

### Passo a passo

1. No Coolify: **New Resource → Docker Compose**, apontando para este repositório
   (o arquivo `docker-compose.yml` da raiz é o padrão).
2. Configure as variáveis de ambiente:

   | Variável | Obrigatória | Observação |
   | --- | --- | --- |
   | `APP_URL` | ✅ | URL pública com https, ex.: `https://app.seudominio.com`. É a base do Better Auth. |
   | `BETTER_AUTH_SECRET` | ✅ | Segredo forte e exclusivo (`openssl rand -base64 32`). |
   | `MYSQL_ROOT_PASSWORD` / `MYSQL_PASSWORD` | ✅ | Senhas do banco. |
   | `MYSQL_DATABASE` / `MYSQL_USER` | — | Padrão `trampocerto` / `trampo_user`. |
   | `DEMO_USER_NAME` / `DEMO_USER_EMAIL` / `DEMO_USER_PASSWORD` | — | Conta criada no primeiro boot. Deixe em branco para subir sem conta e usar `/cadastro`. |
   | `TZ` | — | Padrão `America/Sao_Paulo`. |

   O deploy falha com mensagem explícita se `APP_URL` ou `BETTER_AUTH_SECRET`
   estiverem faltando — melhor do que subir com um segredo padrão.
3. Atribua o domínio ao serviço **`web`** (porta 3000).
4. Deploy. No primeiro boot a API cria o schema, aplica os ajustes de colunas e
   cria a conta inicial; o volume `mysql_data` mantém os dados entre deploys.

### API em domínio próprio (opcional)

Se preferir expor a API separadamente (ex.: `https://api.seudominio.com`):

```env
API_URL=https://api.seudominio.com        # lido em runtime, sem rebuild
FRONTEND_URL=https://app.seudominio.com   # libera o CORS (aceita lista separada por vírgula)
```

Atribua também um domínio ao serviço `api`. Em subdomínios do mesmo site o cookie
padrão (`SameSite=Lax`) já funciona; em **domínios diferentes**, acrescente:

```env
AUTH_COOKIE_SAMESITE=none
```

### Detalhes que fazem a produção funcionar

- **Schema antes de tudo:** o `main.ts` aplica o schema antes de instanciar a
  aplicação, porque o Better Auth valida as tabelas ao ser criado — num banco
  novo isso é o que garante que a conta inicial seja criada.
- **URL da API em runtime:** o layout injeta `window.__TRAMPO_API_URL__` a partir
  de `API_URL` a cada requisição, então trocar o endereço da API no Coolify não
  exige rebuild da imagem.
- **Imagens enxutas:** o frontend usa `output: 'standalone'` e o backend remove as
  dependências de desenvolvimento no build.

---

## 📄 Licença

Este projeto é de propriedade da Advansoftware. Todos os direitos reservados.
