import { Body, Controller, Get, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { RutaPublica } from './decorators/ruta-publica.decorator';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';
import { ObtenerUsuario } from './decorators/obtener-usuario.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @RutaPublica()
  @Post('iniciar-sesion')
  iniciarSesion(@Body() iniciarSesionDto: IniciarSesionDto) {
    return this.autenticacionService.iniciarSesion(iniciarSesionDto);
  }

  @RutaPublica()
  @Post('registrarse')
  registrarse(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.autenticacionService.registrarse(crearUsuarioDto);
  }

  @Get('usuario-autenticado')
  usuarioAutenticado(@ObtenerUsuario() usuario: Usuario) {
    return usuario;
  }
}
