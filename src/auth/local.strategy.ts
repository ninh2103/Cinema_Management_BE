import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  // async validate(Email: string, password: string) {
  //   console.log('Authenticating user:', Email);
  //   const user = await this.authService.validateUser(Email, password);
  //   console.log('Validated user:', user);
  //   if (!user) {
  //     throw new UnauthorizedException('Invalid username or password');
  //   }
  //   return user; // Gắn user vào req.user
  // }
}
