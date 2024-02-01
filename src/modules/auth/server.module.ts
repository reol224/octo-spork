import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ServerController } from './server.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ServerController], // Add your controllers here
  providers: [JwtStrategy],
  exports: [PassportModule],
})
export class ServerModule {
  constructor() {
    console.log('ServerModule initialized');
  }
}
