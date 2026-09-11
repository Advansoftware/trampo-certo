/**
 * DDL idempotente do TrampoCerto.
 *
 * Executado a cada boot pelo SchemaService: o banco converge para este
 * arquivo sem depender do init.sql (que só roda em volume novo).
 */
export const SCHEMA_STATEMENTS: string[] = [
  // ------------------------------------------------------------------ auth
  `CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
    image VARCHAR(500),
    ocupacao VARCHAR(255),
    cnpj VARCHAR(20),
    phone VARCHAR(30),
    cidade VARCHAR(120),
    chavePix VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS session (
    id VARCHAR(36) PRIMARY KEY,
    expiresAt TIMESTAMP NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    ipAddress VARCHAR(45),
    userAgent TEXT,
    userId VARCHAR(36) NOT NULL,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS account (
    id VARCHAR(36) PRIMARY KEY,
    accountId VARCHAR(255) NOT NULL,
    providerId VARCHAR(255) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    accessToken TEXT,
    refreshToken TEXT,
    idToken TEXT,
    accessTokenExpiresAt TIMESTAMP NULL,
    refreshTokenExpiresAt TIMESTAMP NULL,
    scope TEXT,
    password TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS verification (
    id VARCHAR(36) PRIMARY KEY,
    identifier VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL,
    expiresAt TIMESTAMP NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // -------------------------------------------------------------- negócio
  `CREATE TABLE IF NOT EXISTS clientes (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    nome VARCHAR(255) NOT NULL,
    tipo ENUM('PF','PJ') NOT NULL DEFAULT 'PF',
    documento VARCHAR(30),
    telefone VARCHAR(30),
    email VARCHAR(255),
    cidade VARCHAR(120),
    bairro VARCHAR(120),
    observacoes TEXT,
    status ENUM('ativo','inativo') NOT NULL DEFAULT 'ativo',
    tags JSON,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_clientes_user (userId),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS orcamentos (
    id VARCHAR(36) PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    clienteId VARCHAR(36) NULL,
    clienteNome VARCHAR(255) NOT NULL,
    clienteTelefone VARCHAR(30),
    clienteEmail VARCHAR(255),
    clienteDocumento VARCHAR(30),
    clienteLocalizacao VARCHAR(255),
    servicoDescricao TEXT,
    valorTotal DECIMAL(12,2) NOT NULL DEFAULT 0,
    desconto DECIMAL(12,2) NOT NULL DEFAULT 0,
    validadeDias INT NOT NULL DEFAULT 15,
    validade VARCHAR(120),
    condicoesPagamento VARCHAR(255),
    chavePix VARCHAR(255),
    observacoes TEXT,
    status ENUM('rascunho','pendente','aprovado','recusado') NOT NULL DEFAULT 'pendente',
    itens JSON,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_orcamentos_user (userId),
    INDEX idx_orcamentos_cliente (clienteId),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS recibos (
    id VARCHAR(36) PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL,
    userId VARCHAR(36) NOT NULL,
    clienteId VARCHAR(36) NULL,
    orcamentoId VARCHAR(36) NULL,
    propostaCodigo VARCHAR(20),
    clienteNome VARCHAR(255) NOT NULL,
    clienteDocumento VARCHAR(30),
    clienteTelefone VARCHAR(30),
    servicoDescricao TEXT,
    valor DECIMAL(12,2) NOT NULL DEFAULT 0,
    valorExtenso VARCHAR(255),
    formaPagamento VARCHAR(40) NOT NULL DEFAULT 'pix',
    formaPagamentoLabel VARCHAR(120),
    comNotaFiscal BOOLEAN NOT NULL DEFAULT FALSE,
    dataPagamento DATETIME NOT NULL,
    autenticacao VARCHAR(60) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_recibos_user (userId),
    INDEX idx_recibos_data (userId, dataPagamento),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  // Configuração do MEI (parâmetros, não números fabricados).
  `CREATE TABLE IF NOT EXISTS mei_config (
    userId VARCHAR(36) PRIMARY KEY,
    limiteAnual DECIMAL(12,2) NOT NULL DEFAULT 81000.00,
    dasValor DECIMAL(12,2) NOT NULL DEFAULT 75.60,
    dasDiaVencimento TINYINT NOT NULL DEFAULT 20,
    chavePix VARCHAR(255),
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,

  `CREATE TABLE IF NOT EXISTS das_pagamentos (
    id VARCHAR(36) PRIMARY KEY,
    userId VARCHAR(36) NOT NULL,
    competencia CHAR(7) NOT NULL,
    valor DECIMAL(12,2) NOT NULL DEFAULT 0,
    status ENUM('pago','pendente','vencido','a_vencer') NOT NULL DEFAULT 'pendente',
    pagoEm DATE NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_das_user_competencia (userId, competencia),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`,
];

/**
 * Colunas adicionadas depois da primeira versão do init.sql.
 * `ADD COLUMN IF NOT EXISTS` não existe no MySQL 8, então o SchemaService
 * consulta information_schema antes de aplicar cada item.
 */
export const COLUMN_PATCHES: Array<{
  table: string;
  column: string;
  ddl: string;
}> = [
  { table: 'user', column: 'ocupacao', ddl: 'ALTER TABLE user ADD COLUMN ocupacao VARCHAR(255) NULL' },
  { table: 'user', column: 'cidade', ddl: 'ALTER TABLE user ADD COLUMN cidade VARCHAR(120) NULL' },
  { table: 'user', column: 'chavePix', ddl: 'ALTER TABLE user ADD COLUMN chavePix VARCHAR(255) NULL' },
  { table: 'orcamentos', column: 'clienteId', ddl: 'ALTER TABLE orcamentos ADD COLUMN clienteId VARCHAR(36) NULL' },
  { table: 'orcamentos', column: 'desconto', ddl: 'ALTER TABLE orcamentos ADD COLUMN desconto DECIMAL(12,2) NOT NULL DEFAULT 0' },
  { table: 'orcamentos', column: 'chavePix', ddl: 'ALTER TABLE orcamentos ADD COLUMN chavePix VARCHAR(255) NULL' },
  { table: 'orcamentos', column: 'observacoes', ddl: 'ALTER TABLE orcamentos ADD COLUMN observacoes TEXT NULL' },
  { table: 'orcamentos', column: 'clienteLocalizacao', ddl: 'ALTER TABLE orcamentos ADD COLUMN clienteLocalizacao VARCHAR(255) NULL' },
  { table: 'orcamentos', column: 'validade', ddl: 'ALTER TABLE orcamentos ADD COLUMN validade VARCHAR(120) NULL' },
];

/**
 * Ajustes estruturais idempotentes aplicados após as tabelas existirem.
 */
export const ALTER_STATEMENTS: string[] = [
  // O front trabalha com "recusado"; o enum original só tinha "cancelado".
  `ALTER TABLE orcamentos
     MODIFY COLUMN status ENUM('rascunho','pendente','aprovado','recusado','cancelado')
     NOT NULL DEFAULT 'pendente'`,
  `ALTER TABLE orcamentos MODIFY COLUMN valorTotal DECIMAL(12,2) NOT NULL DEFAULT 0`,
];
