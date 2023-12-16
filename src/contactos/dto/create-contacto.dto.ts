import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateContactoDto {
  @IsNotEmpty({ message: 'Los nombres son requeridos' })
  @IsString({ message: 'Los nombres deben ser texto' })
  @MaxLength(100, { message: 'Los nombres debe tener menos de 100 caracteres' })
  nombres: string;

  @IsNotEmpty({ message: 'Los apellidos son requeridos' })
  @IsString({ message: 'Los apellidos deben ser texto' })
  @MaxLength(100, {
    message: 'Los apellidos debe tener menos de 100 caracteres',
  })
  apellidos: string;

  @IsNotEmpty({ message: 'El teléfono o celular es requerido' })
  @IsString({ message: 'El teléfono o celular debe ser texto' })
  @MinLength(7, {
    message: 'El teléfono o celular debe tener al menos 7 caracteres',
  })
  @MaxLength(16, {
    message: 'El teléfono o celular debe tener menos de 16 caracteres',
  })
  telefonoCelular: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico debe ser un correo válido' })
  @MaxLength(100, {
    message: 'El correo electrónico debe tener menos de 100 caracteres',
  })
  correoElectronico: string;

  @IsOptional({ message: 'La dirección es requerida' })
  @IsString({ message: 'La dirección debe ser texto' })
  @MaxLength(100, {
    message: 'La dirección debe tener menos de 100 caracteres',
  })
  direccion: string;
}
