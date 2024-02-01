import { Controller, Get,  UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class ServerController {
  //private readonly logger = new Logger(ServerController.name);

  @Get('public')
  getPublic() {
    return { message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private')
  getPrivate() {
    return { message: 'Hello from a private endpoint! You need to be authenticated to see this.' };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('private-scoped')
  getPrivateScoped() {
    return {
      message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.',
    };
  }



}
