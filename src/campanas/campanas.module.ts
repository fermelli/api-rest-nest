import { Module } from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CampanasController } from './campanas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campana } from './entities/campana.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Campana])],
  controllers: [CampanasController],
  providers: [CampanasService],
})
export class CampanasModule {}
