/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';

import * as sdk from 'matrix-js-sdk';

const matrixcs = require('matrix-js-sdk/lib/matrix');
const request = require('request');
matrixcs.request(request);

@Injectable()
export class AppService {
  private client: any;

  constructor() {
    this.client = sdk.createClient('http://localhost:8008');
  }

  async getLogin(
    user: string,
    password: string,
  ): Promise<{ userId: string; accessToken: string }> {
    const loginResponse = await this.client.login('m.login.password', {
      user: user,
      password: password,
    });
    return new Promise((resolve) => {
      resolve({
        userId: loginResponse.user_id,
        accessToken: loginResponse.access_token,
      });
    });
  }
}
