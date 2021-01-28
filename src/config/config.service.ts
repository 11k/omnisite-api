import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { IDatabaseConfig, IAuthConfig } from './config.interfaces';

export interface EnvConfig {
  [key: string]: any;
}

@Injectable()
export class ConfigurationService {
  private parsedEnv: EnvConfig;

  constructor(private readonly configService: ConfigService) {
    this.parsedEnv = this.validateInput(this.getEnvVars());
  }

  private getEnvVars() {
    const config = {
      host: this.configService.get('db_host'),
      port: this.configService.get('db_port'),
      username: this.configService.get('db_username'),
      password: this.configService.get('db_password'),
      database: this.configService.get('db_name'),
      synchronize: this.configService.get('db_sync'),
      logging: this.configService.get('db_logging'),

      jwtSecret: this.configService.get('JWT_SECRET'),

      discordId: this.configService.get('discord_id'),
      discordSecret: this.configService.get('discord_secret'),

      googleId: this.configService.get('google_id'),
      googleSecret: this.configService.get('google_secret'),
    };
    return config;
  }

  private validateInput(config: EnvConfig): EnvConfig {
    const envSchema: Joi.ObjectSchema = Joi.object({
      host: Joi.string().required(),
      port: Joi.alternatives().try(Joi.number(), Joi.string()).default(3306),
      username: Joi.string().required(),
      password: Joi.string().required(),
      database: Joi.string().required(),
      synchronize: Joi.boolean().required(),
      logging: Joi.boolean().required(),

      jwtSecret: Joi.string(),

      discordId: Joi.string(),
      discordSecret: Joi.string(),

      googleId: Joi.string(),
      googleSecret: Joi.string(),
    });

    const { error, value: validatedEnvConfig } = envSchema.validate(config);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get database(): IDatabaseConfig {
    const config: IDatabaseConfig = {
      host: this.parsedEnv.host,
      port: this.parsedEnv.port,
      username: this.parsedEnv.username,
      password: this.parsedEnv.password,
      database: this.parsedEnv.database,
      synchronize: this.parsedEnv.synchronize,
      logging: this.parsedEnv.logging,
    };
    return config;
  }

  get jwt(): string {
    return this.parsedEnv.jwtSecret;
  }

  get discord(): IAuthConfig {
    const config: IAuthConfig = {
      id: this.parsedEnv.discordId,
      secret: this.parsedEnv.discordSecret,
    };
    return config;
  }

  get google(): IAuthConfig {
    const config: IAuthConfig = {
      id: this.parsedEnv.googleId,
      secret: this.parsedEnv.googleSecret,
    };
    return config;
  }
}
