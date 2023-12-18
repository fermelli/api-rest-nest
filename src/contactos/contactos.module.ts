import { Module } from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { ContactosController } from './contactos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contacto } from './entities/contacto.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { ContactoEtiqueta } from 'src/etiquetas/entities/contacto-etiqueta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contacto, Etiqueta, ContactoEtiqueta])],
  controllers: [ContactosController],
  providers: [ContactosService],
})
export class ContactosModule {}
