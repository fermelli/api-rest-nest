import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { JwtService } from '@nestjs/jwt';
import { RegistrarseDto } from './dtos/registrarse.dto';
import { compareSync } from 'bcrypt';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async iniciarSesion(iniciarSesionDto: IniciarSesionDto) {
    const { correoElectronico, password } = iniciarSesionDto;
    const usuario =
      await this.usuariosService.buscarPorCorreoElectronico(correoElectronico);
    const esPasswordValido = compareSync(password, usuario.password);

    if (usuario && !esPasswordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (usuario && usuario.eliminadoEn) {
      throw new ForbiddenException('No está autorizado');
    }

    delete usuario.password;

    return await this.obtenerJwtToken(usuario);
  }

  async registrarse(registrarseDto: RegistrarseDto) {
    const usuario = await this.usuariosService.create(registrarseDto);

    delete usuario.password;

    return await this.obtenerJwtToken(usuario);
  }

  private async obtenerJwtToken(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
      nombre: usuario.nombre,
      correoElectronico: usuario.correoElectronico,
    };
    const token = await this.jwtService.signAsync(payload);

    return {
      ...usuario,
      token,
    };
  }
}
