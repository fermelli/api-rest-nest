import { IsNotEmpty, IsString } from 'class-validator';
import { EsIgual } from 'src/common/decorators/es-igual.decorator';
import { CrearUsuarioDto } from 'src/usuarios/dtos/crear-usuario.dto';

export class RegistrarseDto extends CrearUsuarioDto {
  @IsNotEmpty()
  @IsString()
  @EsIgual('password')
  passwordConfirmacion: string;
}
