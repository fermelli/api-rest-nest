import { Entity, PrimaryColumn } from 'typeorm';

@Entity('campana_etiqueta')
export class CampanaEtiqueta {
  @PrimaryColumn({ name: 'campana_id', type: 'int' })
  campanaId: number;

  @PrimaryColumn({ name: 'etiqueta_id', type: 'int' })
  etiquetaId: number;
}
