import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { toNumber } from '../common/utils/number.util';
import { MeiService } from './mei.service';
import { MeiRepository } from './mei.repository';

@Controller('api/mei')
@UseGuards(AuthGuard)
export class MeiController {
  constructor(
    private readonly meiService: MeiService,
    private readonly meiRepository: MeiRepository,
  ) {}

  @Get('metrics')
  getMetrics(@CurrentUser('id') userId: string, @Query('ano') ano?: string) {
    return this.meiService.getMetrics(userId, anoOuAtual(ano));
  }

  @Get('receitas-mensais')
  getReceitasMensais(@CurrentUser('id') userId: string, @Query('ano') ano?: string) {
    return this.meiService.getReceitasMensais(userId, anoOuAtual(ano));
  }

  @Get('destaques')
  getDestaques(@CurrentUser('id') userId: string) {
    return this.meiService.getDestaques(userId);
  }

  @Get('config')
  getConfig(@CurrentUser('id') userId: string) {
    return this.meiService.getConfig(userId);
  }

  @Patch('config')
  async updateConfig(@CurrentUser('id') userId: string, @Body() body: Record<string, unknown>) {
    const updates: Record<string, number | string> = {};
    if ('limiteAnual' in body) updates.limiteAnual = toNumber(body.limiteAnual, 81000);
    if ('dasValor' in body) updates.dasValor = toNumber(body.dasValor, 75.6);
    if ('dasDiaVencimento' in body) updates.dasDiaVencimento = Math.min(28, Math.max(1, toNumber(body.dasDiaVencimento, 20)));
    if ('chavePix' in body) updates.chavePix = String(body.chavePix ?? '');

    await this.meiRepository.updateConfig(userId, updates);
    return this.meiService.getConfig(userId);
  }

  @Post('das/:competencia/pagar')
  pagarDas(@CurrentUser('id') userId: string, @Param('competencia') competencia: string) {
    return this.meiService.pagarDas(userId, competencia);
  }
}

function anoOuAtual(ano?: string): number {
  const parsed = Number(ano);
  return Number.isInteger(parsed) && parsed > 2000 ? parsed : new Date().getFullYear();
}
