import { PickType } from '@nestjs/mapped-types';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';

export class IniciarSesionDto extends PickType(CrearUsuarioDto, [
  'correoElectronico',
  'password',
] as const) {}
