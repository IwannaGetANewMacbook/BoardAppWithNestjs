import { User } from 'src/auth/user.entity';
import { BoardsStatus } from './board-status.enum';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { type } from 'os';

// @Entity() 데코레이터는 테이블 생성을 의미하는 데코레이터.
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn() // PK
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardsStatus;

  // eager: false means 보드정보를 가져올 때 유저정보는 가져오지 않겠다.
  @ManyToOne((type) => User, (user) => user.boards, { eager: false })
  user: User;
}
