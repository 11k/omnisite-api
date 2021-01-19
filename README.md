<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

This is a WIP backend replacement for destiny.gg built with NestJS.

## Requirements

- [npm](https://www.npmjs.com/)

## Installation

```bash
$ npm install
```

Add the following files to the root folder and complete them with your values. You can generate a JWT secret with the following command.

```
openssl rand -base64 172 | tr -d '\n'
```

<b>.env.development</b>

```bash
DB_HOST="localhost"
DB_PORT=3306
DB_USERNAME=""
DB_PASSWORD=""
DB_NAME=""
DB_SYNC="true"
DB_LOGGING="false"

JWT_SECRET=""

DISCORD_ID=""
DISCORD_SECRET=""

GOOGLE_ID=""
GOOGLE_SECRET=""
```

<b>ormconfig.js</b>

```bash
module.exports = {
  type: 'mysql',
  host: 'localhost',
  port: '3306',
  username: '',
  password: '',
  database: '',
  synchronize: true,
  logging: false,
  entities: ['src/shared/entities/*.entity.ts'],
  migrations: ['src/shared/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/shared/migrations',
  },
};
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
