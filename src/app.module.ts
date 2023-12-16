import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsuariosModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactosModule } from './contactos/contactos.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
