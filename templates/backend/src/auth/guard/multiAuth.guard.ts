import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { JwtGuard } from './jwt.guard'
import { SessionGuard } from './session.guard'

@Injectable()
export class MultiAuthGuard extends AuthGuard(['jwt', 'session']) {
  constructor(
    private jwtGuard: JwtGuard,
    private sessionGuard: SessionGuard,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Tenta autenticar com JWT
      return await this.jwtGuard.canActivate(context)
    } catch (jwtError) {
      try {
        // Se JWT falhar, tenta autenticar com sessão
        return await this.sessionGuard.canActivate(context)
      } catch (sessionError) {
        throw new UnauthorizedException('Nenhum método de autenticação válido')
      }
    }
  }
}
