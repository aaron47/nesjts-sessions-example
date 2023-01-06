import { AuthDto } from './dto/auth.dto';
import { User } from './../typeorm/entities';

export interface IAuthService {
  validateUser(email: string, password: string): Promise<User>;
  signUp(authDto: AuthDto): Promise<User>;
  findOne(id: number): Promise<User>;
}
