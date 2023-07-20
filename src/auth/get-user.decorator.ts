// getUser 커스텀 데코레이터 만들기.

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest(); // req 안에 req.user가 들어감.
    return req.user;
  },
);
