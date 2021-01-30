import {
  Body,
  Controller,
  Get,
  HttpService,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { createHmac, randomBytes } from 'crypto';

import { AuthType } from 'shared/enums';
import { AuthService } from './auth.service';
import { ConfigurationService } from 'config/config.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigurationService,
    private readonly http: HttpService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('discord')
  public async getUserFromDiscordLogin(
    @Body() accessToken: string,
  ): Promise<string> {
    const { data } = await this.http
      .get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${Object.values(accessToken)[0]}` },
      })
      .toPromise();
    const user = await this.authService.findUser(AuthType.DISCORD, data.id);
    const result = user
      ? user
      : await this.authService.createUser(
          AuthType.DISCORD,
          data.id,
          data.email,
        );
    const payload = {
      user: {
        userId: result.id,
        email: result.email,
      },
    };
    return this.jwtService.sign(payload);
  }

  @Post('google')
  public async getUserFromGoogleLogin(
    @Body() accessToken: string,
  ): Promise<string> {
    const { data } = await this.http
      .get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${Object.values(accessToken)[0]}` },
      })
      .toPromise();
    const user = await this.authService.findUser(AuthType.GOOGLE, data.sub);
    const result = user
      ? user
      : await this.authService.createUser(
          AuthType.GOOGLE,
          data.sub,
          data.email,
        );
    const payload = {
      user: {
        userId: result.id,
        email: result.email,
      },
    };
    return this.jwtService.sign(payload);
  }

  // Passport route
  // @Get('google')
  // @UseGuards(AuthGuard('google'))
  // async getUserFromGoogleLogin(@Req() req): Promise<any> {
  //   return req.user;
  // }

  @Post('reddit')
  public async getUserFromRedditLogin(
    @Body() accessToken: string,
  ): Promise<any> {
    const { data } = await this.http
      .get('https://oauth.reddit.com/api/v1/me', {
        headers: { Authorization: `Bearer ${Object.values(accessToken)[0]}` },
      })
      .toPromise();
    const user = await this.authService.findUser(AuthType.REDDIT, data.id);
    const result = user
      ? user
      : await this.authService.createUser(AuthType.REDDIT, data.id);
    const payload = {
      user: {
        userId: result.id,
      },
    };
    return this.jwtService.sign(payload);
  }

  @Post('twitch')
  public async getUserFromTwitchLogin(
    @Body() accessToken: string,
  ): Promise<any> {
    console.log(accessToken);
    const { data } = await this.http
      .get('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: `Bearer ${Object.values(accessToken)[0]}`,
          'client-id': this.config.twitch.id,
        },
      })
      .toPromise();
    const user = await this.authService.findUser(
      AuthType.TWITCH,
      data.data[0].id,
    );
    const result = user
      ? user
      : await this.authService.createUser(
          AuthType.TWITCH,
          data.data[0].id,
          data.data[0].email,
        );
    const payload = {
      user: {
        userId: result.id,
        email: result.email,
      },
    };
    return this.jwtService.sign(payload);
  }
}
