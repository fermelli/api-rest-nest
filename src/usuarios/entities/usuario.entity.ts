import { Campana } from 'src/campanas/entities/campana.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'nombre', type: 'varchar', length: 100 })
  nombre: string;

  @Column({
    name: 'correo_electronico',
    type: 'varchar',
    length: 100,
    unique: true,
  })
  correoElectronico: string;

  @Column({ name: 'password', type: 'varchar', length: 100 })
  password: string;

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

  @DeleteDateColumn({
    name: 'eliminado_en',
    type: 'timestamp',
    nullable: true,
  })
  eliminadoEn: Date;

  @OneToMany(() => Contacto, (contacto) => contacto.usuario, {
    nullable: false,
  })
  contactos: Contacto[];

  @OneToMany(() => Campana, (campana) => campana.usuario, {
    nullable: false,
  })
  campanas: Campana[];
}
