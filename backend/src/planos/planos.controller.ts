import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PlanosService } from './planos.service';

@Controller('api/planos')
@UseGuards(AuthGuard)
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  /** Plano do usuário logado e quanto da cota do mês já foi usada. */
  @Get('me')
  resumo(@CurrentUser('id') userId: string) {
    return this.planosService.resumo(userId);
  }
}
