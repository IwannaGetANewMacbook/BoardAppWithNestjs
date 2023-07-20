import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || jwtConfig.secret, // 토큰이 유효한지 검증할 때 사용하는 secretKey.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 토큰을 어디에서 추출하는지(헤더에서)
    });
  }

  // 토큰이 유효한지 확인되면 실행되는 함수.
  async validate(payload) {
    const { username } = payload;
    const user: User = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
