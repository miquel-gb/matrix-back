import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
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

  @Get('getAccessToken')
  async getAccessToken(@Headers() headers: any) {
    const authHeader = headers.authorization;
    console.log(headers);
    const accessToken = await this.appService.getAccessToken(authHeader);
    return accessToken;
  }
}
