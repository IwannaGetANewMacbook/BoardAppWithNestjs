import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { v1 as uuid } from 'uuid'; // uuid의 수많은 버전중에 v1 을 사용함.
import { BoardsStatus } from './board-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(
    // @InjectRepository(BoardRepository) // 리포지토리 DI할때는 이 데코레이터 꼭사용해야함.
    private readonly boardRepository: BoardRepository,
  ) {}

  // getAllBoards
  async getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  async getMyPosts(user: User): Promise<Board[]> {
    return await this.boardRepository.getMyPosts(user);
  }

  // createOneBoard
  async createBorad(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(createBoardDto, user);
  }

  // getOneBoardById
  async getBoardById(id: number): Promise<Board> {
    return await this.boardRepository.getBoardById(id);
  }

  // deleteOneBoardById
  async deleteBoardById(id: number, user: User): Promise<void> {
    return await this.boardRepository.deleteBoardById(id, user);
  }

  // 특정 게시물의 status(private or public) 업데이트.
  async updateBoardStatus(id: number, status: BoardsStatus): Promise<Board> {
    return await this.boardRepository.updateBoardStatus(id, status);
  }
}
