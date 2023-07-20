import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');
@Module({
  imports: [
    // UserRepository를 auth모듈의 모든파일이 갖다쓸수 있게 하기위한 설정(필수!!)
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // 토큰을 생성할 때 사용되는 secretKey.
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN || jwtConfig.expiresIn,
      }, // 토큰 유효기간. 3600초.
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // auth모듈에서 사용하기위한 provider
  exports: [JwtStrategy, PassportModule], // 다른모듈에서 해당 모듈이나 컴포넌트를 사용하기 위해.
})
export class AuthModule {}
