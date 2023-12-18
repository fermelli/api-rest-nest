export enum ResultadosAccion {
  PENDIENTE = 'pendiente',
  EXITOSA = 'exitosa',
  FALLIDA = 'fallida',
  SIN_RESPUESTA = 'sin respuesta',
}

export const resultadosAccionArray = Object.keys(ResultadosAccion).map(
  (key) => ResultadosAccion[key],
);
