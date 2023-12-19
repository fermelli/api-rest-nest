import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';

export const ObtenerUsuario = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const usuario = request['usuario'];

    if (!usuario) {
      throw new UnauthorizedException('No esta autenticado');
    }

    return usuario;
  },
);
