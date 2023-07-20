import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  // AuthMoudule 임포트 이유는 auth모듈을 board모듈안에서 쓸 수 있게 하기 위해.
  imports: [TypeOrmModule.forFeature([BoardRepository]), AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  // exports: [BoardRepository],
})
export class BoardsModule {}
