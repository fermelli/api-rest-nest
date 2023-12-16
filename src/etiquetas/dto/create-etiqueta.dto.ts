import { IsHexColor, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateEtiquetaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsHexColor({ message: 'El color debe ser un color hexadecimal' })
  color: string;
}
