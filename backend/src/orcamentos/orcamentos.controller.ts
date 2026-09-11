import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { OrcamentosService } from './orcamentos.service';

@Controller('api/orcamentos')
@UseGuards(AuthGuard)
export class OrcamentosController {
  constructor(private readonly orcamentosService: OrcamentosService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.orcamentosService.findAll(userId);
  }

  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.orcamentosService.findOne(userId, id);
  }

  @Post()
  create(@CurrentUser('id') userId: string, @Body() body: Record<string, unknown>) {
    return this.orcamentosService.create(userId, body);
  }

  @Patch(':id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.orcamentosService.update(userId, id, body);
  }

  @Patch(':id/status')
  updateStatus(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.orcamentosService.updateStatus(userId, id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    await this.orcamentosService.remove(userId, id);
  }
}
