import { Module } from '@nestjs/common';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfiguracion } from './utils';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsuariosModule, JwtModule.register(JwtConfiguracion)],
  controllers: [AutenticacionController],
  providers: [
    AutenticacionService,
    {
      provide: APP_GUARD,
      useClass: AutenticacionGuard,
    },
  ],
})
export class AutenticacionModule {}
