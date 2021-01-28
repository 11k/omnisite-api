import { NestFactory } from '@nestjs/core';
// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

// TODO: Reimplement Fastify once @nestjs/passport supports it https://github.com/nestjs/nest/issues/5702
async function bootstrap() {
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter(),
  // );
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(8000, 'localhost');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
