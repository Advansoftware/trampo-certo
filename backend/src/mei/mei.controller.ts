import { Controller, Get } from '@nestjs/common';
import { MeiService } from './mei.service';

@Controller('api/mei')
export class MeiController {
  constructor(private readonly meiService: MeiService) {}

  @Get('metrics')
  getMetrics() {
    return this.meiService.getMetrics();
  }
}
