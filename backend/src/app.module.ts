import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './database/db.module';
import { AuthModule } from './auth/auth.module';
import { MeiModule } from './mei/mei.module';
import { OrcamentosModule } from './orcamentos/orcamentos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    AuthModule,
    MeiModule,
    OrcamentosModule,
  ],
})
export class AppModule {}
