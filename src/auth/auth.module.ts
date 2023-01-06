import { SessionSerializer } from './common/Serializer';
import { LocalStrategy } from './common/strategies/Local.strategy';
import { Services } from './../utils/Services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/typeorm/entities';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    SessionSerializer,
    {
      provide: Services.AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
