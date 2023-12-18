import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Estados, estadosArray } from '../estados.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { CampanaContacto } from './campana-contacto.entity';

@Entity('campanas')
export class Campana {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'banner', type: 'varchar', length: 255, nullable: true })
  banner: string;

  @Column({
    name: 'estado',
    type: 'enum',
    enum: estadosArray,
    default: 'pendiente',
  })
  estado: Estados;

  @Column({ name: 'fecha_inicio', type: 'date' })
  fechaInicio: Date;

  @Column({ name: 'fecha_fin', type: 'date' })
  fechaFin: Date;

  @CreateDateColumn({
    name: 'creado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  creadoEn: Date;

  @UpdateDateColumn({
    name: 'actualizado_en',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  actualizadoEn: Date;

  @Column({ name: 'usuario_id', type: 'int' })
  usuarioId: number;

  @ManyToOne(() => Usuario, (usuario) => usuario.campanas, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.campanas, {
    cascade: true,
    persistence: false,
  })
  @JoinTable({
    name: 'campana_etiqueta',
    joinColumn: { name: 'campana_id' },
    inverseJoinColumn: { name: 'etiqueta_id' },
  })
  etiquetas: Etiqueta[];

  @OneToMany(
    () => CampanaContacto,
    (campanaContacto) => campanaContacto.campana,
    { cascade: true },
  )
  campanasContactos: CampanaContacto[];
}
