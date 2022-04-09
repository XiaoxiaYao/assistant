import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SendgridModule } from 'src/send-grid/send-grid.module';
import { CheckBuyingVegsService } from './check-buying-vegs.service';

@Module({
  imports: [HttpModule, SendgridModule],
  providers: [CheckBuyingVegsService],
})
export class CheckBuyingVegsModule {}
