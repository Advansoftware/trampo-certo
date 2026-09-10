# TrampoCerto ⚡💼

> Gestor financeiro inteligente, emissor de orçamentos rápidos e termômetro fiscal para o MEI e autônomo brasileiro.

Desenvolvido com foco em alta conversão, responsividade mobile-first e conformidade estrita aos protótipos e design tokens do **Google Stitch (Material You M3)**.

---

## 🚀 Tecnologias

- **Frontend:**
  - Next.js 15+ (App Router, Turbopack)
  - React 19
  - Material UI (MUI v6) com tema customizado e tokens de design oficiais
  - Tipografia: Plus Jakarta Sans & Inter
  - Suporte completo a autenticação (Better Auth / Gov.br / Google)
- **Backend:**
  - NestJS 11
  - MySQL 8.4
  - Pool assíncrono de conexões MySQL
  - Módulos modulares: Autenticação, Métricas MEI e Emissão de Orçamentos
- **DevOps & Containers:**
  - Docker & Docker Compose
  - Hot-reload ativado para desenvolvimento full-stack sem rebuilds manuais

---

## 🖥️ Telas e Recursos Implementados

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
   - Condições comerciais: Desconto percentual, entrada, parcelamento via Pix/Cartão/Boleto e notas personalizadas.
   - Pré-visualização ao vivo em formato de proposta formal A4 para envio direto ao cliente.

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

## 🔐 Credenciais Padrão (Seed)

Para realizar testes imediatos de acesso e visualização:
- **E-mail:** `rodrigo@trampocerto.com.br`
- **Senha:** `123456`
- **Atalho Gov.br:** O botão *Entrar com Gov.br* realiza a autenticação imediata e redireciona para o painel principal.

---

## 📁 Estrutura de Diretórios

```
trampo-certo/
├── assets/                  # Protótipos de tela, logos e design system do Stitch
├── backend/                 # API NestJS com MySQL e Better Auth
│   ├── src/
│   │   ├── auth/            # Módulo e rotas de autenticação
│   │   ├── database/        # Serviço e conexão com MySQL
│   │   ├── mei/             # Métricas e cálculos fiscais do MEI
│   │   └── orcamentos/      # Criação e listagem de orçamentos
│   ├── init.sql             # Script de criação de tabelas e dados seed
│   └── Dockerfile.dev
├── frontend/                # Aplicação Next.js 15 com Material UI
│   ├── public/              # Imagens e assets estáticos
│   ├── src/
│   │   ├── app/             # Rotas do App Router (/login, /dashboard, /orcamentos)
│   │   ├── components/      # Componentes modulares e reutilizáveis
│   │   ├── lib/             # Cliente de API e autenticação
│   │   ├── mocks/           # Dados mock isolados (sem poluir componentes)
│   │   └── theme/           # Design tokens e tema Material 3
│   └── Dockerfile.dev
├── docker-compose.yml       # Orquestração dos serviços para desenvolvimento
├── .env.example             # Modelo seguro de variáveis de ambiente
└── README.md
```

---

## 📄 Licença

Este projeto é de propriedade da Advansoftware. Todos os direitos reservados.
