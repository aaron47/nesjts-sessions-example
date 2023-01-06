import { IAuthService } from './iauth';
import { User } from './../typeorm/entities/User';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && user.password === password) {
      return user;
    }

    return null;
  }

  async signUp(authDto: AuthDto): Promise<User> {
    const newUser = this.userRepository.create(authDto);

    return this.userRepository.save(newUser);
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
