import { AuthDto } from './dto/auth.dto';
import {
  LocalAuthGuard,
  AuthenticatedGuard,
} from './common/guards/Guards.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Services } from 'src/utils/Services';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Services.AUTH_SERVICE) private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return {
      user: req.user,
      msg: "You're logged in!",
    };
  }

  @Post('signup')
  async signUp(@Body() authDto: AuthDto) {
    return this.authService.signUp(authDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('status')
  async status(@Req() req: Request) {
    return req.user;
  }
}
