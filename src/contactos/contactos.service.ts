import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { Contacto } from './entities/contacto.entity';
import { Etiqueta } from 'src/etiquetas/entities/etiqueta.entity';
import { ContactoEtiqueta } from 'src/etiquetas/entities/contacto-etiqueta.entity';

@Injectable()
export class ContactosService {
  logger = new Logger(ContactosService.name);

  constructor(
    @InjectRepository(Contacto)
    private readonly contactosRepository: Repository<Contacto>,

    @InjectRepository(Etiqueta)
    private readonly etiquetasRepository: Repository<Etiqueta>,

    @InjectRepository(ContactoEtiqueta)
    private readonly contactosEtiquetasRepository: Repository<ContactoEtiqueta>,
  ) {}

  async create(createContactoDto: CreateContactoDto, usuarioId: number) {
    const { etiquetas, ...contactoDatos } = createContactoDto;

    try {
      const contacto = this.contactosRepository.create({
        usuarioId,
        ...contactoDatos,
      });

      await this.contactosRepository.save(contacto);

      const etiquetasExistentes = await this.etiquetasRepository.find({
        where: {
          id: In(
            etiquetas
              .filter((etiqueta) => etiqueta.id)
              .map((etiqueta) => etiqueta.id),
          ),
        },
      });

      const datosEtiquetasNuevas = etiquetas.filter((etiqueta) => !etiqueta.id);

      const etiquetasNuevas =
        this.etiquetasRepository.create(datosEtiquetasNuevas);

      await this.etiquetasRepository.save(etiquetasNuevas);

      const etiquetasEnBBDD = [...etiquetasExistentes, ...etiquetasNuevas];

      const etiquetasContacto = etiquetasEnBBDD.map((etiqueta) => {
        return this.contactosEtiquetasRepository.create({
          contactoId: contacto.id,
          etiquetaId: etiqueta.id,
        });
      });

      await this.contactosEtiquetasRepository.save(etiquetasContacto);

      contacto.etiquetas = etiquetasEnBBDD;

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

  async update(
    id: number,
    updateContactoDto: UpdateContactoDto,
    usuarioId: number,
  ) {
    const contacto = await this.contactosRepository.preload({
      id,
      ...updateContactoDto,
    });

    if (!contacto) {
      throw new NotFoundException(`Contacto con id ${id} no encontrado`);
    }

    if (contacto.usuarioId !== usuarioId) {
      throw new ForbiddenException(
        'No tienes permiso para actualizar este contacto',
      );
    }

    try {
      await this.contactosRepository.save(contacto);

      return contacto;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async remove(id: number, usuarioId: number) {
    const contacto = await this.findOne(id);

    if (contacto.usuarioId !== usuarioId) {
      throw new ForbiddenException(
        'No tienes permiso para eliminar este contacto',
      );
    }

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
