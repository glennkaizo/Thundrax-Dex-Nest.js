import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ISessionUser } from './interfaces/session-user.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<ISessionUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    // Destructure the user object to exclude the password more explicitly for improved security.
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  login(user: ISessionUser) {
    const payload = { ...user, sub: user.uuid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
