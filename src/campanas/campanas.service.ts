import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { UpdateCampanaDto } from './dto/update-campana.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Campana } from './entities/campana.entity';

@Injectable()
export class CampanasService {
  logger = new Logger(CampanasService.name);

  constructor(
    @InjectRepository(Campana)
    private readonly campanasRepository: Repository<Campana>,
  ) {}

  async create(createCampanaDto: CreateCampanaDto) {
    try {
      const campana = this.campanasRepository.create(createCampanaDto);

      await this.campanasRepository.save(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async findAll() {
    const campanas = await this.campanasRepository.find();

    return campanas;
  }

  async findOne(id: number) {
    const campana = await this.campanasRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!campana) {
      throw new NotFoundException(`Campaña con id ${id} no encontrado`);
    }

    return campana;
  }

  async update(id: number, updateCampanaDto: UpdateCampanaDto) {
    const campana = await this.campanasRepository.preload({
      id,
      ...updateCampanaDto,
    });

    if (!campana) {
      throw new NotFoundException(`Campaña con id ${id} no encontrado`);
    }

    try {
      await this.campanasRepository.save(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async remove(id: number) {
    const campana = await this.findOne(id);

    try {
      await this.campanasRepository.remove(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  private manejadorError(error: any) {
    this.logger.error(error);

    throw new BadRequestException(`Error: ${error.message}`);
  }
}
