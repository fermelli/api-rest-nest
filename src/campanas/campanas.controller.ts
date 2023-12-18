import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CampanasService } from './campanas.service';
import { CreateCampanaDto } from './dto/create-campana.dto';
import { UpdateCampanaDto } from './dto/update-campana.dto';
import { DarSeguimientoCampanaContactoDto } from './dto/dar-seguimiento-campana-contacto.dto';
import { ObtenerUsuario } from 'src/autenticacion/decorators/obtener-usuario.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('campanas')
export class CampanasController {
  constructor(private readonly campanasService: CampanasService) {}

  @Post()
  create(
    @Body() createCampanaDto: CreateCampanaDto,
    @ObtenerUsuario() usuario: Usuario,
  ) {
    return this.campanasService.create(createCampanaDto, usuario.id);
  }

  @Get()
  findAll() {
    return this.campanasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campanasService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampanaDto: UpdateCampanaDto,
    @ObtenerUsuario() usuario: Usuario,
  ) {
    return this.campanasService.update(+id, updateCampanaDto, usuario.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ObtenerUsuario() usuario: Usuario) {
    return this.campanasService.remove(+id, usuario.id);
  }

  @Patch(':id/iniciar')
  iniciar(@Param('id') id: string, @ObtenerUsuario() usuario: Usuario) {
    return this.campanasService.iniciar(+id, usuario.id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string, @ObtenerUsuario() usuario: Usuario) {
    return this.campanasService.cancelar(+id, usuario.id);
  }

  @Patch(':id/finalizar')
  finalizar(@Param('id') id: string, @ObtenerUsuario() usuario: Usuario) {
    return this.campanasService.finalizar(+id, usuario.id);
  }

  @Get(':id/contactos/usuarios')
  obtenerContactosDeUsuario(
    @Param('id') id: string,
    @ObtenerUsuario() usuario: Usuario,
  ) {
    return this.campanasService.obtenerContactosDeUsuario(+id, usuario.id);
  }

  @Patch('campana-contacto/:id/usuarios')
  darSeguimientoCampanaContacto(
    @Param('id') id: string,
    @ObtenerUsuario() usuario: Usuario,
    @Body() darSeguimientoCampanaContacto: DarSeguimientoCampanaContactoDto,
  ) {
    return this.campanasService.darSeguimientoCampanaContacto(
      +id,
      +usuario.id,
      darSeguimientoCampanaContacto,
    );
  }
}
