import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const codigoEstado = exception.getStatus();

    console.log('%O', exception);

    response.status(codigoEstado).json({
      statusCode: codigoEstado,
      error: exception.message,
      message: exception.getResponse(),
    });
  }
}
