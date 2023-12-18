import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfiguracion: JwtModuleOptions = {
  global: true,
  secret: 'secret',
  signOptions: { expiresIn: '4h' },
};
