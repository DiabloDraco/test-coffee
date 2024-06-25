import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { Raw } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    console.log(authDto);

    const user = await this.userService.findOne({
      where: {
        login: authDto.login,
        password: Raw((alias) => `HASH_CHECK(${alias},'${authDto.password}')`),
      },
      relations: {
        roles: true,
      },
    });
    console.log(user);

    this.userService.updateOne(user.id);

    return {
      token: this.encode(user),
    };
  }

  encode(payload: any) {
    return this.jwtService.sign({ user: payload });
  }

  decode(token: string): Auth {
    return this.jwtService.verify(token);
  }
}
