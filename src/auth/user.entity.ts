import { IsNotEmpty } from 'class-validator';
import { Board } from 'src/boards/board.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['username']) // username을 유니크엔티티로 선언하여 중복username 방지.
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @Column()
  username: string;

  @IsNotEmpty()
  @Column()
  password: string;

  // eager: true means 유저정보를 가져올 때 보드 정보도 같이 가져오겠다.
  @OneToMany((type) => Board, (board) => board.user, { eager: true })
  boards: Board[];
}
