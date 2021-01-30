import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';

import { ConfigurationService } from 'config/config.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private readonly config: ConfigurationService) {
    super({
      clientID: config.google.id,
      clientSecret: config.google.secret,
      callbackURL: 'http://localhost:8000/auth/google',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log(accessToken, refreshToken, profile);
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
