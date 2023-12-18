import { CampanaContacto } from 'src/campanas/entities/campana-contacto.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
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

@Entity('contactos')
export class Contacto {
  @PrimaryGeneratedColumn('increment', { name: 'id', type: 'int' })
  id: number;

  @Column({ name: 'nombres', type: 'varchar', length: 100 })
  nombres: string;

  @Column({ name: 'apellidos', type: 'varchar', length: 100 })
  apellidos: string;

  @Column({ name: 'telefono_celular', type: 'varchar', length: 16 })
  telefonoCelular: string;

  @Column({ name: 'correo_electronico', type: 'varchar', length: 100 })
  correoElectronico: string;

  @Column({ name: 'direccion', type: 'varchar', length: 100, nullable: true })
  direccion: string;

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

  @ManyToOne(() => Usuario, (usuario) => usuario.contactos, { nullable: false })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToMany(() => Etiqueta, (etiqueta) => etiqueta.contactos, {
    cascade: true,
  })
  @JoinTable({
    name: 'contacto_etiqueta',
    joinColumn: { name: 'contacto_id' },
    inverseJoinColumn: { name: 'etiqueta_id' },
  })
  etiquetas: Etiqueta[];

  @OneToMany(
    () => CampanaContacto,
    (campanaContacto) => campanaContacto.contacto,
  )
  campanasContactos: CampanaContacto[];
}
