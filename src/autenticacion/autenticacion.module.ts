import { Module } from '@nestjs/common';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AutenticacionGuard } from './guards/autenticacion.guard';
import { SECRET } from './utils';

@Module({
  imports: [
    UsuariosModule,
    JwtModule.register({
      global: true,
      secret: SECRET,
      signOptions: {
        expiresIn: '4h',
      },
    }),
  ],
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
