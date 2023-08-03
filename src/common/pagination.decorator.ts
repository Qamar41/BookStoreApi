// pagination.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Pagination = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const page = parseInt(request.query.page, 10) || 1;
  const pageSize = parseInt(request.query.pageSize, 10) || 10;

  return {
    page,
    pageSize,
  };
});
