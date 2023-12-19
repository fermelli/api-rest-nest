import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SECRET } from '../utils';
import { Reflector } from '@nestjs/core';
import { RUTA_PUBLICA_METADATO } from '../decorators/ruta-publica.decorator';

@Injectable()
export class AutenticacionGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers?.authorization?.split(' ')[1];
    const esPublico = this.reflector.getAllAndOverride<boolean>(
      RUTA_PUBLICA_METADATO,
      [context.getHandler(), context.getClass()],
    );

    if (esPublico) {
      return true;
    }

    if (!token) {
      throw new UnauthorizedException('No autenticado');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: SECRET,
      });

      request['usuario'] = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException('No autenticado');
    }
  }
}
