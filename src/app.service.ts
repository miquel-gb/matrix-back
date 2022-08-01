/* eslint-disable @typescript-eslint/no-var-requires */
import { ConsoleLogger, Injectable } from '@nestjs/common';

import * as auth0 from 'auth0-js';

import jwt_decode from "jwt-decode";

import * as sdk from 'matrix-js-sdk';

const matrixcs = require('matrix-js-sdk/lib/matrix');
const request = require('request');
matrixcs.request(request);

@Injectable()
export class AppService {
  private client: any;

  private auth: any;

  constructor() {
    this.client = sdk.createClient('http://localhost:8008');
    // const configuration = {
    //   domain: 'xtg.eu.auth0.com',
    //   clientID: 'z5bs7Yo5L5tZ18hU7aHskyQu7nutyagO',
    //   redirectUri: 'https://dev-app.travelgatex.com/login-local?redirect=4200',
    //   responseType: 'token id_token',
    //   scope: 'openid profile email picture name',
    //   responseMode: 'form_post',
    // };
    // this.auth = new auth0.WebAuth(configuration);
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
  getAccessToken(
    bearer: string,
  ): Promise<{ userId: string; accessToken: string }> {
    console.log(bearer);
    const accessToken = bearer.split(' ')[1];
    const decoded = jwt_decode(accessToken);
    console.log(decoded);
    const expDate = decoded['exp'];
    const now = new Date().getTime() / 1000;

    return new Promise(async (resolve, reject) => {
      if (expDate < now) {
        reject('Token expired');
      } else {
        const loginResponse = await this.client.login('m.login.password', {
          user: decoded['email'].split('@')[0],
          password: 'test',
        });
        resolve({
          userId: loginResponse.user_id,
          accessToken: loginResponse.access_token,
        });
      }
    });
  }
}
