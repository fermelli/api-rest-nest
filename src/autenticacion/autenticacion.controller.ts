import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { EsPublico } from './decorators/es-publico.decorator';
import { RegistrarseDto } from './dtos/registrarse.dto';
import { ObtenerUsuario } from './decorators/obtener-usuario.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @EsPublico()
  @Post('iniciar-sesion')
  async iniciarSesion(@Body() iniciarSesionDto: IniciarSesionDto) {
    return await this.autenticacionService.iniciarSesion(iniciarSesionDto);
  }

  @EsPublico()
  @Post('registrarse')
  async registrarse(@Body() registrarseDto: RegistrarseDto) {
    return await this.autenticacionService.registrarse(registrarseDto);
  }

  @Get('usuario-autenticado')
  async usuarioAutenticado(@ObtenerUsuario() usuario: Usuario) {
    return usuario;
  }
}
