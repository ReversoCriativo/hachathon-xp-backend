import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt.guard';

export function Protected() {
  const decorators = [
    ApiBearerAuth(),
    ApiUnauthorizedResponse(),
    UseGuards(JwtAuthGuard),
  ];

  return applyDecorators(...decorators);
}
