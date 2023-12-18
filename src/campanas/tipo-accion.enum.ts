export enum TiposAccion {
  LLAMADA = 'llamada',
  CORREO = 'correo',
  MENSAJE = 'mensaje',
}

export const tiposAccionArray = Object.keys(TiposAccion).map(
  (key) => TiposAccion[key],
);
