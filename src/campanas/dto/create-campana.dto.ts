import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
  ValidateNested,
} from 'class-validator';
import { CreateEtiquetaConIdDto } from 'src/etiquetas/dto/create-etiqueta-con-id.dto';

export class CreateCampanaDto {
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString({ message: 'El nombre debe ser texto' })
  @MaxLength(100, { message: 'El nombre debe tener menos de 100 caracteres' })
  nombre: string;

  @IsNotEmpty({ message: 'La descripción es requerida' })
  @IsString({ message: 'La descripción debe ser texto' })
  @MaxLength(65535, {
    message: 'La descripción debe tener menos de 65535 caracteres',
  })
  descripcion: string;

  @IsOptional()
  @IsString({ message: 'El banner debe ser texto' })
  @MaxLength(255, {
    message: 'El banner debe tener menos de 255 caracteres',
  })
  banner: string;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'La fecha de inicio es requerida' })
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  @MinDate(new Date(new Date().setHours(0, 0, 0, 0)))
  fechaInicio: Date;

  @Transform(({ value }) => new Date(new Date(value).setHours(23, 59, 59, 999)))
  @IsNotEmpty({ message: 'La fecha de fin es requerida' })
  @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
  @MinDate(new Date(new Date().setHours(0, 0, 0, 0)))
  fechaFin: Date;

  @Type(() => Number)
  @IsNotEmpty({ message: 'El id de usuario es requerido' })
  @IsInt({ message: 'El id de usuario debe ser un número entero' })
  usuarioId: number;

  @Type(() => CreateEtiquetaConIdDto)
  @IsArray({ message: 'Las etiquetas deben ser un arreglo' })
  @ArrayMinSize(1, { message: 'Debe tener al menos una etiqueta' })
  @ValidateNested()
  etiquetas: CreateEtiquetaConIdDto[];
}
