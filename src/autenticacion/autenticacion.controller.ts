import { Body, Controller, Post } from '@nestjs/common';
import { AutenticacionService } from './autenticacion.service';
import { RegistrarseDto } from './dtos/registrarse.dto';
import { Publico } from './decorators/publico.decorator';

@Controller('autenticacion')
export class AutenticacionController {
  constructor(private readonly autenticacionService: AutenticacionService) {}

  @Publico()
  @Post('registrarse')
  registrarse(@Body() registrarseDto: RegistrarseDto) {
    return this.autenticacionService.registrarse(registrarseDto);
  }
}
