export enum Estados {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en proceso',
  FINALIZADA = 'finalizada',
  CANCELADA = 'cancelada',
}

export const estadosArray = Object.keys(Estados).map((key) => Estados[key]);
