// 커스텀 파이프 만들기

import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardsStatus } from '../board-status.enum';

// 커스텀 파이프: status 는 PUBLIC 과 PRIVATE 둘 중 하나만 올 수 있기때문에 이외의 값이 오면 예외를 처리하는 Pipe.
export class BoardStatusValidationPipe implements PipeTransform {
  // readonly 설정은 외부에서 값을 변경하지 못하도록 막아줌.
  readonly StatusOption = [BoardsStatus.PRIVATE, BoardsStatus.PUBLIC];

  transform(value: any) {
    value = value.toUpperCase();
    const index = this.StatusOption.indexOf(value);
    if (index === -1) {
      throw new BadRequestException(`${value} is not in the status options.`);
    }
    return value;
  }
}
