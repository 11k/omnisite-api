import { Body, Controller, HttpService, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthType } from 'shared/enums';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
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
          data.username,
        );
    const payload = {
      user: {
        userId: result.id,
        email: result.email,
        username: result.username,
      },
    };
    return this.jwtService.sign(payload);
  }

  @Post('google')
  public async getUserFromGoogleLogin(
    @Body() accessToken: string,
  ): Promise<any> {
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
}
