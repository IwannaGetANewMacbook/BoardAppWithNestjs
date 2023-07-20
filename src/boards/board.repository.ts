import { CreateBoardDto } from './dto/create-board.dto';
// 리포지토리 파일.

import { EntityRepository, Repository, getConnection } from 'typeorm';
import { Board } from './board.entity';
import { BoardsStatus } from './board-status.enum';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // getAllBoards
  async getAllBoards(): Promise<Board[]> {
    const allBoards = await this.find();
    return allBoards;
  }

  async getMyPosts(user: User): Promise<Board[]> {
    const boardsByUserName = await this.createQueryBuilder('board')
      .where('board.userId = :x', { x: user.id })
      .getMany();
    return boardsByUserName;
  }

  // createOneBoard
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardsStatus.PUBLIC,
      user,
    });

    await this.save(board);
    return board;
  }

  // getOneBoardById
  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ id });
    if (!found) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
    return found;
  }

  // deleteOneBoardById
  async deleteBoardById(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user: user });
    if (result.affected === 0) {
      console.log(`Can not find Board with id ${id}`);
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
  }

  // UpdateOneBoardStatus
  async updateBoardStatus(id: number, status: BoardsStatus): Promise<Board> {
    const board = await this.getBoardById(id);

    board.status = status;
    await this.save(board);

    return board;
  }
}
