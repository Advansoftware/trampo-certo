import { Body, Controller, Delete, Get, HttpCode, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/guards/auth.guard';
import { AdminGuard } from '../common/guards/admin.guard';
import { AdminService } from './admin.service';

/** Área do administrador definido no .env. A ordem dos guards importa:
 *  o AuthGuard preenche request.user, que o AdminGuard confere. */
@Controller('api/admin')
@UseGuards(AuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  findAll() {
    return this.adminService.findAll();
  }

  @Patch('users/:id')
  update(@Param('id') id: string, @Body() body: Record<string, unknown>) {
    return this.adminService.update(id, body);
  }

  @Delete('users/:id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.adminService.remove(id);
  }
}
