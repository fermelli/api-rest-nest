import { Module } from '@nestjs/common';
import { EtiquetasService } from './etiquetas.service';
import { EtiquetasController } from './etiquetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etiqueta } from './entities/etiqueta.entity';
import { ContactoEtiqueta } from './entities/contacto-etiqueta.entity';
import { CampanaEtiqueta } from './entities/campana-etiqueta.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Etiqueta, CampanaEtiqueta, ContactoEtiqueta]),
  ],
  controllers: [EtiquetasController],
  providers: [EtiquetasService],
})
export class EtiquetasModule {}
