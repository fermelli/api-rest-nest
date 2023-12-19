import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearUsuarioDto } from './dtos/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dtos/actualizar-usuario.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsuariosService {
  logger = new Logger(UsuariosService.name);

  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll(withDeleted: boolean) {
    const usuarios = await this.usuariosRepository.find({
      withDeleted,
    });

    return usuarios;
  }

  async create(crearUsuarioDto: CrearUsuarioDto) {
    try {
      crearUsuarioDto.password = hashSync(crearUsuarioDto.password, 10);

      const usuario = this.usuariosRepository.create(crearUsuarioDto);

      await this.usuariosRepository.save(usuario);

      return usuario;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async findOne(id: number) {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      withDeleted: true,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    return usuario;
  }

  async update(id: number, actualizarUsuarioDto: ActualizarUsuarioDto) {
    const usuario = await this.usuariosRepository.preload({
      id,
      ...actualizarUsuarioDto,
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }

    try {
      await this.usuariosRepository.save(usuario);

      return usuario;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);

    try {
      await this.usuariosRepository.remove(usuario);

      return usuario;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async softRemove(id: number) {
    const usuario = await this.findOne(id);

    try {
      await this.usuariosRepository.softRemove(usuario);

      return usuario;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  private manejadorError(error: any) {
    this.logger.error(error);

    throw new BadRequestException(`Error: ${error.message}`);
  }

  async restore(id: number) {
    try {
      await this.usuariosRepository.restore(id);

      const usuario = this.findOne(id);

      return usuario;
    } catch (error) {
      this.manejadorError(error);
    }
  }

  async buscarPorCorreoElectronico(correoElectronico: string) {
    const usuario = await this.usuariosRepository.findOne({
      where: { correoElectronico: Equal(correoElectronico) },
      withDeleted: true,
    });

    return usuario; // null | Usuario
  }
}
