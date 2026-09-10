import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrcamentoDto, OrcamentosService } from './orcamentos.service';

@Controller('api/orcamentos')
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  @Get()
  findAll() {
    return this.orcamentosService.findAll();
  }

  @Post()
  create(@Body() dto: CreateOrcamentoDto) {
    return this.orcamentosService.create(dto);
  }
}
