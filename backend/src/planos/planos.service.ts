import { ForbiddenException, Injectable } from '@nestjs/common';
import {
  LIMITES_POR_PLANO,
  RecursoLimitado,
  ResumoPlano,
  ROTULO_RECURSO,
} from './plano.entity';
import { PlanosRepository } from './planos.repository';

@Injectable()
export class PlanosService {
  constructor(private readonly repository: PlanosRepository) {}

  async resumo(userId: string): Promise<ResumoPlano> {
    const [plano, uso] = await Promise.all([
      this.repository.planoDoUsuario(userId),
      this.repository.usoDoMes(userId),
    ]);

    const agora = new Date();
    const competencia = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}`;

    return { plano, limites: LIMITES_POR_PLANO[plano], uso, competencia };
  }

  /**
   * Barra a criação quando a cota do mês acabou.
   *
   * Roda no serviço, antes de qualquer escrita: o limite do plano não pode
   * depender do front, que só esconde o botão.
   */
  async assertPodeCriar(userId: string, recurso: RecursoLimitado): Promise<void> {
    const plano = await this.repository.planoDoUsuario(userId);
    const limite = LIMITES_POR_PLANO[plano][recurso];
    if (limite === null) return;

    const usados = await this.repository.contarNoMes(userId, recurso);
    if (usados < limite) return;

    throw new ForbiddenException(
      `Você usou os ${limite} ${ROTULO_RECURSO[recurso]} do plano gratuito neste mês. ` +
        'Assine o Pro para continuar ou aguarde a virada do mês.',
    );
  }
}
