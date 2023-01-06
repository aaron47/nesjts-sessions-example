import { Services } from './../../utils/Services';
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/entities';
import { IAuthService } from '../iauth';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: IAuthService,
  ) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: User) => void): void {
    return done(null, user);
  }

  async deserializeUser(
    payload: User,
    done: (err: Error, payload: User) => void,
  ): Promise<void> {
    const user = await this.authService.findOne(payload.id);

    return user ? done(null, user) : done(null, null);
  }
}
