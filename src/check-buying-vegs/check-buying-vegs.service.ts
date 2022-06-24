import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SendgridService } from 'src/send-grid/send-grid.service';

@Injectable()
export class CheckBuyingVegsService {
  constructor(
    private httpService: HttpService,
    private readonly sendgridService: SendgridService,
    private readonly configService: ConfigService,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS)
  async check() {
    const response = await this.httpService
      .get('https://www.apple.com.cn/shop/refurbished/mac/macbook-pro-32gb')
      .toPromise();
    if (this.configService.get('ON') == 1) {
      try {
        if (response.data.includes('16,199')) {
          const mail = {
            to: this.configService.get('SEND_GRID_TO_EMAIL'),
            subject: 'Order now!',
            from: this.configService.get('SEND_GRID_FROM_EMAIL'),
            text: 'Order now',
          };
          await this.sendgridService.send(mail);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}
