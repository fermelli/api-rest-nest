import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CrearUsuarioDto } from './dtos/crear-usuario.dto';
import { ActualizarUsuarioDto } from './dtos/actualizar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  findAll(@Query('withDeleted', ParseBoolPipe) withDeleted: boolean) {
    return this.usuariosService.findAll(withDeleted);
  }

  @Post()
  create(@Body() crearUsuarioDto: CrearUsuarioDto) {
    return this.usuariosService.create(crearUsuarioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    return this.usuariosService.update(+id, actualizarUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuariosService.remove(+id);
  }

  @Delete(':id/desactivar')
  softRemove(@Param('id') id: string) {
    return this.usuariosService.softRemove(+id);
  }

  @Patch(':id/activar')
  restore(@Param('id') id: string) {
    return this.usuariosService.restore(+id);
  }
}
