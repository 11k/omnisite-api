import { HttpService, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-oauth2';
import { stringify } from 'querystring';

import { AuthType } from 'shared/enums';
import { AuthService } from '../auth.service';
import { ConfigurationService } from 'config/config.service';

const callbackURL = 'http://127.0.0.1:8000/auth/discord';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigurationService,
    private readonly http: HttpService,
    private readonly jwtService: JwtService,
  ) {
    super({
      authorizationURL: `https://discordapp.com/api/oauth2/authorize?${stringify(
        {
          client_id: config.discord.id,
          redirect_uri: callbackURL,
          response_type: 'code',
          scope: ['email', 'identify'],
        },
      )}`,
      tokenURL: 'https://discordapp.com/api/oauth2/token',
      // TODO: Add state
      scope: ['email', 'identify'],
      clientID: config.discord.id,
      clientSecret: config.discord.secret,
      callbackURL,
    });
  }

  async validate(accessToken: string): Promise<any> {
    const { data } = await this.http
      .get('https://discordapp.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` },
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
      userId: result.id,
      email: result.email,
      username: result.username,
    };
    console.log('result', payload, accessToken);
    return { access_token: this.jwtService.sign(payload) };
    // TODO: Redirect to frontend
    // return result;
  }
}
