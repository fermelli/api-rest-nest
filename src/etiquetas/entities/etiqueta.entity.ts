import { Campana } from 'src/campanas/entities/campana.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('etiquetas')
export class Etiqueta {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ name: 'color', type: 'varchar', length: 10 })
  color: string;

  @CreateDateColumn({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creadoEn: Date;

  @ManyToMany(() => Contacto, (contacto) => contacto.etiquetas)
  @JoinTable({
    name: 'contacto_etiqueta',
    joinColumn: { name: 'etiqueta_id' },
    inverseJoinColumn: { name: 'contacto_id' },
  })
  contactos: Contacto[];

  @ManyToMany(() => Campana, (campana) => campana.etiquetas)
  @JoinTable({
    name: 'campana_etiqueta',
    joinColumn: { name: 'etiqueta_id' },
    inverseJoinColumn: { name: 'campana_id' },
  })
  campanas: Campana[];
}
