-- TrampoCerto Database Schema
CREATE DATABASE IF NOT EXISTS trampocerto;
USE trampocerto;

-- Better Auth: User table
CREATE TABLE IF NOT EXISTS user (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
  image VARCHAR(500),
  cnpj VARCHAR(20),
  phone VARCHAR(30),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Better Auth: Session table
CREATE TABLE IF NOT EXISTS session (
  id VARCHAR(36) PRIMARY KEY,
  expiresAt TIMESTAMP NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ipAddress VARCHAR(45),
  userAgent TEXT,
  userId VARCHAR(36) NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- Better Auth: Account table (OAuth & Password)
CREATE TABLE IF NOT EXISTS account (
  id VARCHAR(36) PRIMARY KEY,
  accountId VARCHAR(255) NOT NULL,
  providerId VARCHAR(255) NOT NULL,
  userId VARCHAR(36) NOT NULL,
  accessToken TEXT,
  refreshToken TEXT,
  idToken TEXT,
  accessTokenExpiresAt TIMESTAMP,
  refreshTokenExpiresAt TIMESTAMP,
  scope TEXT,
  password TEXT,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- Better Auth: Verification table
CREATE TABLE IF NOT EXISTS verification (
  id VARCHAR(36) PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL,
  value VARCHAR(255) NOT NULL,
  expiresAt TIMESTAMP NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- MEI Metrics table (Termômetro MEI & Totais)
CREATE TABLE IF NOT EXISTS mei_metrics (
  id VARCHAR(36) PRIMARY KEY,
  userId VARCHAR(36) NOT NULL,
  faturamentoAcumulado DECIMAL(10,2) NOT NULL DEFAULT 42350.00,
  limiteAnual DECIMAL(10,2) NOT NULL DEFAULT 81000.00,
  faturamentoMes DECIMAL(10,2) NOT NULL DEFAULT 6420.00,
  aReceber DECIMAL(10,2) NOT NULL DEFAULT 1850.00,
  dasMeiValor DECIMAL(10,2) NOT NULL DEFAULT 75.60,
  dasMeiVencimento DATE,
  dasMeiStatus ENUM('pago', 'pendente', 'vencido') DEFAULT 'pendente',
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- Orçamentos & Propostas table
CREATE TABLE IF NOT EXISTS orcamentos (
  id VARCHAR(36) PRIMARY KEY,
  codigo VARCHAR(20) NOT NULL,
  userId VARCHAR(36) NOT NULL,
  clienteNome VARCHAR(255) NOT NULL,
  clienteTelefone VARCHAR(30),
  clienteEmail VARCHAR(255),
  clienteDocumento VARCHAR(30),
  servicoDescricao TEXT,
  valorTotal DECIMAL(10,2) NOT NULL,
  validadeDias INT DEFAULT 15,
  condicoesPagamento VARCHAR(255),
  status ENUM('aprovado', 'pendente', 'cancelado', 'rascunho') DEFAULT 'pendente',
  itens JSON,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
);

-- Seed initial test user
INSERT IGNORE INTO user (id, name, email, emailVerified, cnpj, phone)
VALUES ('demo-mei-user-01', 'Rodrigo Silva', 'rodrigo@trampocerto.com.br', TRUE, '45.123.789/0001-90', '(11) 98765-4321');

-- Seed MEI metrics for demo user
INSERT IGNORE INTO mei_metrics (id, userId, faturamentoAcumulado, limiteAnual, faturamentoMes, aReceber, dasMeiValor, dasMeiVencimento, dasMeiStatus)
VALUES ('demo-metrics-01', 'demo-mei-user-01', 42350.00, 81000.00, 6420.00, 1850.00, 75.60, '2026-09-20', 'pendente');

-- Seed sample orçamentos
INSERT IGNORE INTO orcamentos (id, codigo, userId, clienteNome, clienteTelefone, clienteEmail, clienteDocumento, servicoDescricao, valorTotal, validadeDias, condicoesPagamento, status, itens)
VALUES 
('orc-001', 'ORC-2026-042', 'demo-mei-user-01', 'Mariana Costa', '(11) 99887-1122', 'mariana@email.com', '123.456.789-00', 'Manutenção elétrica e instalação de quadro bifásico', 1450.00, 15, '50% sinal + 50% na conclusão (Pix)', 'aprovado', '[{"descricao": "Substituição de disjuntores e cabeamento", "qtd": 1, "unitario": 850.00, "total": 850.00}, {"descricao": "Instalação de 8 luminárias LED de embutir", "qtd": 8, "unitario": 75.00, "total": 600.00}]'),
('orc-002', 'ORC-2026-043', 'demo-mei-user-01', 'Studio Criativo Beta', '(11) 97766-3344', 'contato@studiocriativo.com', '33.444.555/0001-22', 'Adequação de tomadas de piso e aterramento', 980.00, 10, 'À vista via Pix com 5% desconto', 'pendente', '[{"descricao": "Ponto de tomada industrial reforçada", "qtd": 4, "unitario": 170.00, "total": 680.00}, {"descricao": "Haste de aterramento com teste de continuidade", "qtd": 1, "unitario": 300.00, "total": 300.00}]');
