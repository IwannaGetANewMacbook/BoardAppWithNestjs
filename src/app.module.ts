import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardRepository } from './boards/board.repository';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forRoot(typeORMConfig), // typeORM을 어플리케이션에 연결.
    // TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmModule.forFeature([BoardRepository]),
    AuthModule,
  ],
})
export class AppModule {}
