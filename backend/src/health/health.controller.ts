import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  async check() {
    await this.db.raw('SELECT 1');
    return { status: 'ok', database: 'up', timestamp: new Date().toISOString() };
  }
}
