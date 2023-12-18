import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { UpdateCampanaDto } from './dto/update-campana.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, In, Repository } from 'typeorm';
import { Campana } from './entities/campana.entity';
import { Estados } from './estados.enum';
import { Contacto } from 'src/contactos/entities/contacto.entity';
import { CampanaContacto } from './entities/campana-contacto.entity';
import { DarSeguimientoCampanaContactoDto } from './dto/dar-seguimiento-campana-contacto.dto';
import { ResultadosAccion } from './resultado-accion.enum';

@Injectable()
export class CampanasService {
  logger = new Logger(CampanasService.name);

  constructor(
    @InjectRepository(Campana)
    private readonly campanasRepository: Repository<Campana>,

    @InjectRepository(Contacto)
    private readonly contactosRepository: Repository<Contacto>,

    @InjectRepository(CampanaContacto)
    private readonly campanasContactosRepository: Repository<CampanaContacto>,
  ) {}

  async create(createCampanaDto: CreateCampanaDto) {
    try {
      const campana = this.campanasRepository.create({
        estado: Estados.PENDIENTE,
        ...createCampanaDto,
      });

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

  async iniciar(id: number) {
    const campana = await this.campanasRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        etiquetas: true,
      },
    });

    if (!campana) {
      throw new NotFoundException(`Campaña con id ${id} no encontrado`);
    }

    if (campana.etiquetas.length === 0) {
      throw new BadRequestException(
        'La campaña debe tener al menos una etiqueta',
      );
    }

    if (campana.estado !== Estados.PENDIENTE) {
      throw new BadRequestException('La campaña no esta pendiente');
    }

    const contactosConEtiquetas = await this.contactosRepository.find({
      where: {
        etiquetas: {
          id: In(campana.etiquetas.map((etiqueta) => etiqueta.id)),
        },
      },
    });

    if (contactosConEtiquetas.length === 0) {
      throw new BadRequestException(
        'No hay contactos con las etiquetas de la campaña',
      );
    }

    try {
      campana.estado = Estados.EN_PROCESO;

      const campanasContactos = [];

      contactosConEtiquetas.forEach((contacto) => {
        const campanaContacto = this.campanasContactosRepository.create({
          contactoId: contacto.id,
        });

        campanasContactos.push(campanaContacto);
      });

      campana.campanasContactos = campanasContactos;

      await this.campanasRepository.save(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async cancelar(id: number) {
    const campana = await this.campanasRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        campanasContactos: true,
      },
    });

    if (!campana) {
      throw new NotFoundException(`Campaña con id ${id} no encontrado`);
    }

    if (campana.estado !== Estados.EN_PROCESO) {
      throw new BadRequestException('La campaña no esta en proceso');
    }

    try {
      campana.estado = Estados.CANCELADA;

      await this.campanasRepository.save(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async finalizar(id: number) {
    const campana = await this.campanasRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        campanasContactos: true,
      },
    });

    if (!campana) {
      throw new NotFoundException(`Campaña con id ${id} no encontrado`);
    }

    if (campana.estado !== Estados.EN_PROCESO) {
      throw new BadRequestException('La campaña no esta en proceso');
    }

    try {
      campana.estado = Estados.FINALIZADA;

      await this.campanasRepository.save(campana);

      return campana;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  obtenerContactosDeUsuario(id: number, usuarioId: number) {
    const contactos = this.campanasRepository.find({
      where: {
        id: Equal(id),
        campanasContactos: {
          contacto: {
            usuarioId: Equal(usuarioId),
          },
        },
      },
      relations: {
        campanasContactos: {
          contacto: true,
        },
      },
    });

    return contactos;
  }

  async darSeguimientoCampanaContacto(
    id: number,
    usuarioId: number,
    darSeguimientoCampanaContactoDto: DarSeguimientoCampanaContactoDto,
  ) {
    const campanaContacto = await this.campanasContactosRepository.findOne({
      where: { id: Equal(id) },
      relations: {
        campana: true,
        contacto: {
          usuario: true,
        },
      },
    });

    if (!campanaContacto) {
      throw new NotFoundException(
        `Campaña contacto con id ${id} no encontrado`,
      );
    }

    if (campanaContacto.campana.estado !== Estados.EN_PROCESO) {
      throw new BadRequestException('La campaña no esta en proceso');
    }

    if (campanaContacto.campana.fechaInicio > new Date()) {
      throw new BadRequestException('La campaña no ha iniciado');
    }

    if (campanaContacto.campana.fechaFin < new Date()) {
      throw new BadRequestException('La campaña ha finalizado');
    }

    if (campanaContacto.contacto.usuario.id !== usuarioId) {
      throw new BadRequestException('El contacto no pertenece al usuario');
    }

    if (campanaContacto.resultadoAccion !== ResultadosAccion.PENDIENTE) {
      throw new BadRequestException('El seguimiento ya fue realizado');
    }

    try {
      campanaContacto.tipoAccion = darSeguimientoCampanaContactoDto.tipoAccion;
      campanaContacto.resultadoAccion =
        darSeguimientoCampanaContactoDto.resultadoAccion;
      campanaContacto.fechaAccion = new Date();

      await this.campanasContactosRepository.save(campanaContacto);

      return campanaContacto;
    } catch (error) {
      this.manejadorError(error);
    }
  }
}
