-- Inicialização do container MySQL.
--
-- O schema das tabelas vive em backend/src/database/schema.ts e é aplicado
-- pelo SchemaService a cada boot da API (idempotente, roda em banco novo ou
-- já existente). Aqui ficam só as garantias de banco/charset.
CREATE DATABASE IF NOT EXISTS trampocerto
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;

ALTER DATABASE trampocerto
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_0900_ai_ci;
