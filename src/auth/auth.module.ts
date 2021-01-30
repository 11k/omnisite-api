import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigurationModule } from '../config/config.module';
import { ConfigurationService } from '../config/config.service';
import { JwtStrategy, GoogleStrategy } from './strategies';
import { User } from '../shared/entities';

@Module({
  imports: [
    ConfigurationModule,
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: async (config: ConfigurationService) => ({
        secret: config.jwt,
        signOptions: { expiresIn: '30d' },
      }),
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
