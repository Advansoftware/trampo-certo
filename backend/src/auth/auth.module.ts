import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthBootstrapService } from './auth-bootstrap.service';

@Module({
  controllers: [AuthController],
  providers: [AuthBootstrapService],
})
export class AuthModule {}
