import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    // @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtServive: JwtService, // jwt DI주입
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const isUser = await this.userRepository.findOne({ username }); // bool값 반환.
    const comparePW = await bcrypt.compare(password, isUser.password); // bool값 반환.

    if (isUser && comparePW) {
      // 유저 토큰 생성.(Secret + Payload)
      const payload = { username };
      const accessToken = this.jwtServive.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException('login failed');
    }
  }
}
