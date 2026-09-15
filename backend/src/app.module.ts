import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ClientesModule } from './clientes/clientes.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';
import { RecibosModule } from './recibos/recibos.module';
import { MeiModule } from './mei/mei.module';
import { PlanosModule } from './planos/planos.module';
import { AdminModule } from './admin/admin.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    ClientesModule,
    OrcamentosModule,
    RecibosModule,
    MeiModule,
    PlanosModule,
    AdminModule,
    HealthModule,
  ],
})
export class AppModule {}
