import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Joi from '@hapi/joi';

import { IDatabaseConfig, IDiscordConfig } from './config.interfaces';

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

      discordId: this.configService.get('discord_id'),
      discordSecret: this.configService.get('discord_secret'),
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

      discordId: Joi.string(),
      discordSecret: Joi.string(),
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

  get discord(): IDiscordConfig {
    const config: IDiscordConfig = {
      id: this.parsedEnv.discordId,
      secret: this.parsedEnv.discordSecret,
    };
    return config;
  }
}
