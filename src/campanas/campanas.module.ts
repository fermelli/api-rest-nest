import { Module } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CampanasController } from './campanas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campana } from './entities/campana.entity';
import { CampanaContacto } from './entities/campana-contacto.entity';
import { Contacto } from 'src/contactos/entities/contacto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Campana,
      CampanaContacto,
      Contacto,
      CampanaContacto,
    ]),
  ],
  controllers: [CampanasController],
  providers: [CampanasService],
})
export class CampanasModule {}
