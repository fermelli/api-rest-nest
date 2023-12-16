import { Injectable, Logger } from '@nestjs/common';
import { RegistrarseDto } from './dtos/registrarse.dto';
import { hashSync } from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AutenticacionService {
  logger = new Logger(AutenticacionService.name);

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async registrarse(registrarseDto: RegistrarseDto) {
    registrarseDto.password = hashSync(registrarseDto.password, 10);

    const usuario = await this.usuariosService.create(registrarseDto);

    delete usuario.eliminadoEn;

    const token = await this.obtenerJWTToken(usuario);

    return token;
  }

  private async obtenerJWTToken(jwtPayload: any) {
    const payload = JSON.parse(JSON.stringify(jwtPayload));
    const token = await this.jwtService.signAsync(payload);

    return token;
  }
}
