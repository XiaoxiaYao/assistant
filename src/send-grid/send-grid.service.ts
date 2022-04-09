import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get('SEND_GRID_KEY'));
  }

  async send(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      return transport;
    } catch (error) {
      throw error;
    }
  }
}
