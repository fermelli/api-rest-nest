import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfiguracion } from '../utils';
import { Request } from 'express';
import { ES_PUBLICO_LLAVE } from '../decorators/es-publico.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers?.authorization?.split(' ')[1];
    // se verifica si la ruta es publica
    const esPublico = this.reflector.getAllAndOverride<boolean>(
      ES_PUBLICO_LLAVE,
      [context.getHandler(), context.getClass()],
    );

    if (esPublico) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: JwtConfiguracion.secret,
      });

      request['usuario'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    return true;
  }
}
