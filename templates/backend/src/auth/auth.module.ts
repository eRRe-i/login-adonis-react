import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'
import { ConfigService } from '@nestjs/config'
import { MultiAuthGuard } from './guard/multiAuth.guard'
import { JwtGuard } from './guard'
import { SessionGuard } from './guard/session.guard'

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService, MultiAuthGuard],
  providers: [AuthService, MultiAuthGuard, JwtGuard, SessionGuard, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
