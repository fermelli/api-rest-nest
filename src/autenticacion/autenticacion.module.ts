import { Module } from '@nestjs/common';
import { AutenticacionController } from './autenticacion.controller';
import { AutenticacionService } from './autenticacion.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAutenticacionGuard } from './guards/jwt.autenticacion.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '4h' },
    }),
  ],
  controllers: [AutenticacionController],
  providers: [
    AutenticacionService,
    UsuariosService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAutenticacionGuard,
    },
  ],
})
export class AutenticacionModule {}
