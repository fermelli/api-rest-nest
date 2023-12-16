import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usuariosService: UsuariosService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  async validate(jwtPayload: any): Promise<Usuario> {
    const usuario = await this.usuariosService.findOne(jwtPayload.id);

    if (!usuario) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    if (usuario.eliminadoEn) {
      throw new UnauthorizedException('Usuario no esta activo');
    }

    return usuario;
  }
}
