import { IsDate, IsIn, IsNotEmpty, MaxDate } from 'class-validator';
import {
  ResultadosAccion,
  resultadosAccionArray,
} from '../resultado-accion.enum';
import { TiposAccion, tiposAccionArray } from '../tipo-accion.enum';
import { Transform } from 'class-transformer';

export class DarSeguimientoCampanaContactoDto {
  @IsNotEmpty()
  @IsIn(tiposAccionArray)
  tipoAccion: TiposAccion;

  @IsNotEmpty()
  @IsIn(
    resultadosAccionArray.filter(
      (resultado) => resultado !== ResultadosAccion.PENDIENTE,
    ),
  )
  resultadoAccion: ResultadosAccion;

  @Transform(({ value }) => new Date(value))
  @IsNotEmpty({ message: 'La fecha de acción es requerida' })
  @IsDate({ message: 'La fecha de acción debe ser una fecha válida' })
  @MaxDate(new Date(new Date().setHours(23, 59, 59, 999)))
  fechaAccion: Date;
}
