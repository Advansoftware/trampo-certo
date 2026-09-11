import { Module } from '@nestjs/common';
import { ClientesModule } from '../clientes/clientes.module';
import { OrcamentosController } from './orcamentos.controller';
import { OrcamentosService } from './orcamentos.service';
import { OrcamentosRepository } from './orcamentos.repository';

@Module({
  imports: [ClientesModule],
  controllers: [OrcamentosController],
  providers: [OrcamentosService, OrcamentosRepository],
  exports: [OrcamentosService, OrcamentosRepository],
})
export class OrcamentosModule {}
