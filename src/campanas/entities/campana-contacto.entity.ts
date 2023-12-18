import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TiposAccion } from '../tipo-accion.enum';
import { Campana } from './campana.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';

@Entity('campana_contacto')
export class CampanaContacto {
  @PrimaryGeneratedColumn('increment', { type: 'int' })
  id: number;

  @Column({ name: 'campana_id', type: 'int', nullable: false })
  campanaId: number;

  @Column({ name: 'contacto_id', type: 'int', nullable: false })
  contactoId: number;

  @Column({
    name: 'tipo_accion',
    type: 'enum',
    enum: TiposAccion,
    nullable: true,
  })
  tipoAccion?: TiposAccion;

  @Column({ name: 'fecha_inicio', type: 'date', nullable: true })
  fechaAccion?: Date;

  @Column({
    name: 'resultado_accion',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  resultadoAccion?: string;

  @CreateDateColumn({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creadoEn: Date;

  @ManyToOne(() => Campana, (campana) => campana.campanasContactos)
  @JoinColumn({ name: 'campana_id' })
  campana: Campana;

  @ManyToOne(() => Contacto, (cantacto) => cantacto.campanasContactos)
  @JoinColumn({ name: 'contacto_id' })
  contacto: Contacto;
}
