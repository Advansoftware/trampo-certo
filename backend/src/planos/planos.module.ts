import { Module } from '@nestjs/common';
import { PlanosController } from './planos.controller';
import { PlanosService } from './planos.service';
import { PlanosRepository } from './planos.repository';

@Module({
  controllers: [PlanosController],
  providers: [PlanosService, PlanosRepository],
  exports: [PlanosService, PlanosRepository],
})
export class PlanosModule {}
