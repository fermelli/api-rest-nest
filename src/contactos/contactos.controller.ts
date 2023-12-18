import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactosService } from './contactos.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';
import { ObtenerUsuario } from 'src/autenticacion/decorators/obtener-usuario.decorator';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Controller('contactos')
export class ContactosController {
  constructor(private readonly contactosService: ContactosService) {}

  @Post()
  create(
    @Body() createContactoDto: CreateContactoDto,
    @ObtenerUsuario() usuario: Usuario,
  ) {
    return this.contactosService.create(createContactoDto, usuario.id);
  }

  @Get()
  findAll() {
    return this.contactosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactoDto: UpdateContactoDto,
    @ObtenerUsuario() usuario: Usuario,
  ) {
    return this.contactosService.update(+id, updateContactoDto, usuario.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ObtenerUsuario() usuario: Usuario) {
    return this.contactosService.remove(+id, usuario.id);
  }
}
