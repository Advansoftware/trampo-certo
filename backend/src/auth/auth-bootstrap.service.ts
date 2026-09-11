import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { auth } from './auth.config';

/** Tabelas de negócio que seguem o dono dos dados numa migração de conta. */
const TABELAS_DO_USUARIO = ['orcamentos', 'recibos', 'clientes', 'das_pagamentos'];

/** Linhas de exemplo do init.sql original, gravadas com encoding corrompido. */
const SEEDS_ANTIGOS = ['orc-001', 'orc-002'];

/**
 * Garante que a conta de acesso configurada em DEMO_USER_EMAIL/DEMO_USER_PASSWORD
 * exista com senha real (hash do Better Auth).
 *
 * O projeto nasceu com um usuário semeado por SQL, sem credenciais — impossível
 * de logar. Quando esse usuário é encontrado, seus dados são transferidos para a
 * conta criada pelo Better Auth antes de ele ser removido, então nenhum orçamento
 * já cadastrado se perde.
 */
@Injectable()
export class AuthBootstrapService implements OnModuleInit {
  private readonly logger = new Logger(AuthBootstrapService.name);

  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    await this.removerSeedsAntigos();

    const email = process.env.DEMO_USER_EMAIL?.trim();
    const password = process.env.DEMO_USER_PASSWORD?.trim();
    if (!email || !password) return;

    const legado = await this.encontrarUsuarioSemCredencial(email);
    if (legado) await this.liberarEmail(legado);

    const userId = await this.criarConta(email, password);
    if (userId && legado) await this.migrarDados(legado, userId);
  }

  private async removerSeedsAntigos(): Promise<void> {
    const placeholders = SEEDS_ANTIGOS.map(() => '?').join(', ');
    await this.db.mutate(`DELETE FROM orcamentos WHERE id IN (${placeholders})`, SEEDS_ANTIGOS);
  }

  /**
   * @returns o id do usuário que ocupa o e-mail mas não tem senha cadastrada,
   *          ou null se o e-mail estiver livre ou já pertencer a uma conta válida.
   */
  private async encontrarUsuarioSemCredencial(email: string): Promise<string | null> {
    const usuario = await this.db.queryOne<{ id: string }>('SELECT id FROM user WHERE email = ?', [email]);
    if (!usuario) return null;

    const credencial = await this.db.queryOne<{ id: string }>(
      "SELECT id FROM account WHERE userId = ? AND providerId = 'credential'",
      [usuario.id],
    );
    return credencial ? null : usuario.id;
  }

  private async liberarEmail(userId: string): Promise<void> {
    await this.db.mutate('UPDATE user SET email = CONCAT(?, id, ?) WHERE id = ?', [
      'legado+',
      '@trampocerto.local',
      userId,
    ]);
  }

  private async criarConta(email: string, password: string): Promise<string | null> {
    const existente = await this.db.queryOne<{ id: string }>('SELECT id FROM user WHERE email = ?', [email]);
    if (existente) return existente.id;

    try {
      const criado = await auth.api.signUpEmail({
        body: { email, password, name: process.env.DEMO_USER_NAME || 'Profissional MEI' },
      });
      this.logger.log(`Conta inicial criada para ${email}`);
      return criado?.user?.id ?? null;
    } catch (error) {
      this.logger.error(`Não foi possível criar a conta inicial: ${(error as Error).message}`);
      return null;
    }
  }

  private async migrarDados(origemId: string, destinoId: string): Promise<void> {
    if (origemId === destinoId) return;

    await this.db.transaction(async (conn) => {
      const [perfil] = await conn.execute(
        `UPDATE user destino
            JOIN user origem ON origem.id = ?
            SET destino.ocupacao = COALESCE(destino.ocupacao, origem.ocupacao),
                destino.cnpj     = COALESCE(destino.cnpj, origem.cnpj),
                destino.phone    = COALESCE(destino.phone, origem.phone),
                destino.cidade   = COALESCE(destino.cidade, origem.cidade),
                destino.chavePix = COALESCE(destino.chavePix, origem.chavePix)
          WHERE destino.id = ?`,
        [origemId, destinoId],
      );
      void perfil;

      for (const tabela of TABELAS_DO_USUARIO) {
        await conn.execute(`UPDATE ${tabela} SET userId = ? WHERE userId = ?`, [destinoId, origemId]);
      }
      await conn.execute('DELETE FROM mei_config WHERE userId = ?', [origemId]);
      await conn.execute('DELETE FROM user WHERE id = ?', [origemId]);
    });

    this.logger.log(`Dados do usuário legado ${origemId} migrados para ${destinoId}`);
  }
}
