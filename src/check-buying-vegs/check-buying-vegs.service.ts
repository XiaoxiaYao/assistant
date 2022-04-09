import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { SendgridService } from 'src/send-grid/send-grid.service';

@Injectable()
export class CheckBuyingVegsService {
  constructor(
    private httpService: HttpService,
    private readonly sendgridService: SendgridService,
    private readonly configService: ConfigService,
  ) {}

  @Cron('0/15 * * * * *')
  async check() {
    if (this.configService.get('ON')) {
      try {
        const response = await this.httpService
          .get('https://www.wenjuan.com/s/UZBZJvaVTgF/?is=qrcode')
          .toPromise();
        if (response.data.includes('该表单已停止收集')) {
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
