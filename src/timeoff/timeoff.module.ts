import { Module } from '@nestjs/common';
import { TimeoffController } from './timeoff.controller';
import { TimeoffService } from './timeoff.service';

@Module({
  controllers: [TimeoffController],
  providers: [TimeoffService]
})
export class TimeoffModule {}
