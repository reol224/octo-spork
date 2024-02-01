import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ApiConfigService } from '../../shared/services/api-config.service';
// import { UserService } from '../user/user.service';
import dotenv from 'dotenv';


dotenv.config();
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ApiConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.authConfig.publicKey,
      issuer: process.env.ISSUER_BASE_URL,
      audience: process.env.AUDIENCE,
      algorithm: 'RS256',
    });
  }

  validate(payload: unknown): unknown {
    return payload;
  }
}
