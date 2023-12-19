import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactosModule } from './contactos/contactos.module';
import { CampanasModule } from './campanas/campanas.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { AutenticacionModule } from './autenticacion/autenticacion.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'api-rest-nest',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    UsuariosModule,
    ContactosModule,
    CampanasModule,
    EtiquetasModule,
    AutenticacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
