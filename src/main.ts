import { Session } from './typeorm/entities';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionStore = app.get(DataSource).getRepository(Session);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.setGlobalPrefix('api');
  app.use(
    session({
      secret: '546545dkjrwgkhwrjkgw45wr64gw54rg465rwg4wr654q564fwe654w65g',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 360000,
      },
      store: new TypeormStore().connect(sessionStore),
    }),
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(5000);
}
bootstrap();
