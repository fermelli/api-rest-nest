import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { JwtService } from '@nestjs/jwt';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { compareSync } from 'bcrypt';

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

    if (!usuario || !esPasswordValido) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    delete usuario.password;

    return await this.generarToken(usuario);
  }

  async registrarse(crearUsuarioDto: CrearUsuarioDto) {
    const usuario = await this.usuariosService.create(crearUsuarioDto);

    delete usuario.password;

    return await this.generarToken(usuario);
  }

  private async generarToken(usuario: Usuario) {
    const payload = {
      sub: usuario.id,
      ...usuario,
      roles: ['administrador', 'consultor'],
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      ...usuario,
      token,
    };
  }
}
