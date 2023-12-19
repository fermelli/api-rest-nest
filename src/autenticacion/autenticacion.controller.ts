import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { IniciarSesionDto } from './dtos/iniciar-sesion.dto';
import { RutaPublica } from './decorators/ruta-publica.decorator';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';

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
}
