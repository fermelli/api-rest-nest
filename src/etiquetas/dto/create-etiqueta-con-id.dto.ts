import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { CreateEtiquetaDto } from './create-etiqueta.dto';

export class CreateEtiquetaConIdDto extends CreateEtiquetaDto {
  @Type(() => Number)
  @IsOptional({ message: 'El id es requerido' })
  @IsInt({ message: 'El id debe ser un número entero' })
  id: number;
}
