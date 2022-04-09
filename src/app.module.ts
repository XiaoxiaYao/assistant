import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckBuyingVegsModule } from './check-buying-vegs/check-buying-vegs.module';
import { SendgridModule } from './send-grid/send-grid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    CheckBuyingVegsModule,
    SendgridModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
