import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ClientesService } from './clientes.service';

@Controller('api/clientes')
@UseGuards(AuthGuard)
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findAll(@CurrentUser('id') userId: string) {
    return this.clientesService.findAll(userId);
  }

  @Get(':id')
  findOne(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return this.clientesService.findOne(userId, id);
  }

  @Post()
  create(@CurrentUser('id') userId: string, @Body() body: Record<string, unknown>) {
    return this.clientesService.create(userId, body);
  }

  @Patch(':id')
  update(
    @CurrentUser('id') userId: string,
    @Param('id') id: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.clientesService.update(userId, id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@CurrentUser('id') userId: string, @Param('id') id: string) {
    await this.clientesService.remove(userId, id);
  }
}
