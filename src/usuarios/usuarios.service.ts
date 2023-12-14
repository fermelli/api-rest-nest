import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async findAll() {
    const usuarios = await this.usuariosRepository.find();

    return usuarios;
  }

  async create(datosUsuario) {
    const usuario = this.usuariosRepository.create(datosUsuario);

    await this.usuariosRepository.save(usuario);

    return usuario;
  }
}
