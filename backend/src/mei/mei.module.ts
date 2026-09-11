import { Module } from '@nestjs/common';
import { MeiController } from './mei.controller';
import { MeiService } from './mei.service';
import { MeiRepository } from './mei.repository';

@Module({
  controllers: [MeiController],
  providers: [MeiService, MeiRepository],
  exports: [MeiService, MeiRepository],
})
export class MeiModule {}
