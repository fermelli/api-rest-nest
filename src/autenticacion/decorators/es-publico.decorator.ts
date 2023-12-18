import { SetMetadata } from '@nestjs/common';

export const ES_PUBLICO_LLAVE = 'esPublico';

export const EsPublico = () => SetMetadata(ES_PUBLICO_LLAVE, true);
