import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';

@Injectable()
export class ContactosService {
  logger = new Logger(ContactosService.name);

  constructor(
    @InjectRepository(Contacto)
    private readonly contactosRepository: Repository<Contacto>,
  ) {}

  async create(createContactoDto: CreateContactoDto) {
    console.log(createContactoDto);
    try {
      const contacto = this.contactosRepository.create(createContactoDto);

      await this.contactosRepository.save(contacto);

      return contacto;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async findAll() {
    const contactos = await this.contactosRepository.find();

    return contactos;
  }

  async findOne(id: number) {
    const contacto = await this.contactosRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        usuario: true,
      },
    });

    if (!contacto) {
      throw new NotFoundException(`Contacto con id ${id} no encontrado`);
    }

    return contacto;
  }

  async update(id: number, updateContactoDto: UpdateContactoDto) {
    const contacto = await this.contactosRepository.preload({
      id,
      ...updateContactoDto,
    });

    if (!contacto) {
      throw new NotFoundException(`Contacto con id ${id} no encontrado`);
    }

    try {
      await this.contactosRepository.save(contacto);

      return contacto;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async remove(id: number) {
    const contacto = await this.findOne(id);

    try {
      await this.contactosRepository.remove(contacto);

      return contacto;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  private manejadorError(error: any) {
    this.logger.error(error);

    throw new BadRequestException(`Error: ${error.message}`);
  }
}
