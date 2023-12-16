import { Module } from '@nestjs/common';
import { EtiquetasService } from './etiquetas.service';
import { EtiquetasController } from './etiquetas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etiqueta } from './entities/etiqueta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etiqueta])],
  controllers: [EtiquetasController],
  providers: [EtiquetasService],
})
export class EtiquetasModule {}
