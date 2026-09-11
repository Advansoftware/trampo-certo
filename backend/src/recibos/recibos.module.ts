import { Module } from '@nestjs/common';
import { ClientesModule } from '../clientes/clientes.module';
import { OrcamentosModule } from '../orcamentos/orcamentos.module';
import { RecibosController } from './recibos.controller';
import { RecibosService } from './recibos.service';
import { RecibosRepository } from './recibos.repository';

@Module({
  imports: [ClientesModule, OrcamentosModule],
  controllers: [RecibosController],
  providers: [RecibosService, RecibosRepository],
  exports: [RecibosService, RecibosRepository],
})
export class RecibosModule {}
