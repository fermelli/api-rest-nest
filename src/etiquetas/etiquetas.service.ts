import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateEtiquetaDto } from './dto/create-etiqueta.dto';
import { UpdateEtiquetaDto } from './dto/update-etiqueta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Etiqueta } from './entities/etiqueta.entity';

@Injectable()
export class EtiquetasService {
  logger = new Logger(EtiquetasService.name);

  constructor(
    @InjectRepository(Etiqueta)
    private readonly etiquetasRepository: Repository<Etiqueta>,
  ) {}

  async create(createEtiquetaDto: CreateEtiquetaDto) {
    try {
      const etiqueta = this.etiquetasRepository.create(createEtiquetaDto);

      await this.etiquetasRepository.save(etiqueta);

      return etiqueta;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async findAll() {
    const etiquetas = await this.etiquetasRepository.find();

    return etiquetas;
  }

  async findOne(id: number) {
    const etiqueta = await this.etiquetasRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!etiqueta) {
      throw new NotFoundException(`Etiqueta con id ${id} no encontrada`);
    }

    return etiqueta;
  }

  async update(id: number, updateEtiquetaDto: UpdateEtiquetaDto) {
    const etiqueta = await this.etiquetasRepository.preload({
      id,
      ...updateEtiquetaDto,
    });

    if (!etiqueta) {
      throw new NotFoundException(`Etiqueta con id ${id} no encontrado`);
    }

    try {
      await this.etiquetasRepository.save(etiqueta);

      return etiqueta;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async remove(id: number) {
    const etiqueta = await this.findOne(id);

    try {
      await this.etiquetasRepository.remove(etiqueta);

      return etiqueta;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  private manejadorError(error: any) {
    this.logger.error(error);

    throw new BadRequestException(`Error: ${error.message}`);
  }
}
