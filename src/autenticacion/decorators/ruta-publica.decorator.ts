import { SetMetadata } from '@nestjs/common';

export const RUTA_PUBLICA_METADATO = 'rutaPublica';

export const RutaPublica = () => SetMetadata(RUTA_PUBLICA_METADATO, true);
