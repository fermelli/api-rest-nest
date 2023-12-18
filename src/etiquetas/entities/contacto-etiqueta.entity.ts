import { Entity, PrimaryColumn } from 'typeorm';

@Entity('contacto_etiqueta')
export class ContactoEtiqueta {
  @PrimaryColumn({ name: 'contacto_id', type: 'int' })
  contactoId: number;

  @PrimaryColumn({ name: 'etiqueta_id', type: 'int' })
  etiquetaId: number;
}
