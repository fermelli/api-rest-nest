import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CrearUsuarioDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'El correo electrónico es requerido' })
  @IsEmail({}, { message: 'El correo electrónico debe ser un correo válido' })
  correoElectronico: string;

  @IsNotEmpty({ message: 'La contraseña es requerida' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'La contraseña es muy débil: Debe contener al menos 8 caracteres, 1 minúscula, 1 mayúscula, 1 número y 1 símbolo',
    },
  )
  password: string;
}
