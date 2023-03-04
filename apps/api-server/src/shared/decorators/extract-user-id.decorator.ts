import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const ExtractUserId = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    const { headers } = request;
    const accessToken = headers?.authorization.split(' ')[1];
    const decodedToken = jwt.decode(accessToken);
    const user_id: string = decodedToken['id'];
    return user_id;
  },
);
