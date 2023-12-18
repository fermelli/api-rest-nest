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

@Controller('campanas')
export class CampanasController {
  constructor(private readonly campanasService: CampanasService) {}

  @Post()
  create(@Body() createCampanaDto: CreateCampanaDto) {
    return this.campanasService.create(createCampanaDto);
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
  update(@Param('id') id: string, @Body() updateCampanaDto: UpdateCampanaDto) {
    return this.campanasService.update(+id, updateCampanaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campanasService.remove(+id);
  }

  @Patch(':id/iniciar')
  iniciar(@Param('id') id: string) {
    return this.campanasService.iniciar(+id);
  }

  @Patch(':id/cancelar')
  cancelar(@Param('id') id: string) {
    return this.campanasService.cancelar(+id);
  }

  @Patch(':id/finalizar')
  finalizar(@Param('id') id: string) {
    return this.campanasService.finalizar(+id);
  }
}
