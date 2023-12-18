import { PickType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';

export class IniciarSesionDto extends PickType(CrearUsuarioDto, [
  'correoElectronico',
] as const) {
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string;
}
