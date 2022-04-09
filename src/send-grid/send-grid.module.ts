import { Module } from '@nestjs/common';
import { SendgridService } from './send-grid.service';

@Module({
  providers: [SendgridService],
  exports: [SendgridService],
})
export class SendgridModule {}
