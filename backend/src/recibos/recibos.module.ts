import { Module } from '@nestjs/common';
import { ClientesModule } from '../clientes/clientes.module';
import { OrcamentosModule } from '../orcamentos/orcamentos.module';
import { PlanosModule } from '../planos/planos.module';
import { RecibosController } from './recibos.controller';
import { RecibosService } from './recibos.service';
import { RecibosRepository } from './recibos.repository';

@Module({
  imports: [ClientesModule, OrcamentosModule, PlanosModule],
  controllers: [RecibosController],
  providers: [RecibosService, RecibosRepository],
  exports: [RecibosService, RecibosRepository],
})
export class RecibosModule {}
