import {
  BadRequestException,
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { Request } from 'express';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

export const ObtenerUsuario = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const usuario = request['usuario'];

    if (!usuario) {
      throw new BadRequestException('No se ha autenticado');
    }

    delete usuario?.iat;
    delete usuario?.exp;

    return usuario as Usuario;
  },
);
