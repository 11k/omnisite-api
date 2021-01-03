export interface IDatabaseConfig {
  readonly host: string;
  readonly port: number;
  readonly username: string;
  readonly password: string;
  readonly database: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export interface IDiscordConfig {
  readonly id: string;
  readonly secret: string;
}
