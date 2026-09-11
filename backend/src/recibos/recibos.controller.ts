import { Body, Controller, Delete, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { RecibosService } from './recibos.service';

@Controller('api/recibos')
@UseGuards(AuthGuard)
export class RecibosController {
  constructor(private readonly recibosService: RecibosService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.recibosService.findAll(userId);
  }

  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.recibosService.findOne(userId, id);
  }

  @Post()
  create(@CurrentUser('id') userId: string, @Body() body: Record<string, unknown>) {
    return this.recibosService.create(userId, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    await this.recibosService.remove(userId, id);
  }
}
