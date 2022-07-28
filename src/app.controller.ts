import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('getLogin')
  async getLogin(@Body() body: any) {
    const accessToken = await this.appService.getLogin(
      body['user'],
      body['password'],
    );
    return accessToken;
  }
}
